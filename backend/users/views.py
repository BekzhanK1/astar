import datetime
from rest_framework import viewsets, mixins, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from users.permissions import (
    IsSuperadminOrSupervisor,
    IsSuperadminUser,
    IsSupervisorUser,
    IsCuratorUser,
)
from .models import Lesson, Meeting, User, Flow
from .serializers import (
    CustomTokenObtainPairSerializer,
    EventSerializer,
    LessonOutputSerializer,
    LessonSerializer,
    MeetingSerializer,
    UserSerializer,
    FlowSerializer,
)

from dateutil.parser import parse
from .services import LessonService


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserViewSet(viewsets.ModelViewSet):
    """
    ModelViewSet for managing users with different roles.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ["create", "destroy"]:
            if self.request.data.get("role") == "supervisor":
                self.permission_classes = [IsAuthenticated, IsSuperadminUser]
            else:
                self.permission_classes = [
                    IsAuthenticated,
                    (IsSuperadminUser | IsSupervisorUser),
                ]
        elif self.action in ["list", "retrieve"]:
            self.permission_classes = [
                IsAuthenticated,
                (IsSuperadminUser | IsSupervisorUser),
            ]
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        role = request.query_params.get("role")
        if role:
            queryset = queryset.filter(role=role)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        role = self.request.data.get("role")
        email = self.request.data.get("email")
        first_name = self.request.data.get("first_name")
        last_name = self.request.data.get("last_name")

        if User.objects.filter(email=email).exists():
            raise ValidationError("User with this email already exists")

        serializer.save(
            email=email, first_name=first_name, last_name=last_name, role=role
        )


class FlowViewSet(viewsets.ModelViewSet):
    """
    ModelViewSet for managing flows.
    """

    queryset = Flow.objects.all()
    serializer_class = FlowSerializer
    permission_classes = [IsAuthenticated, (IsSuperadminUser | IsSupervisorUser)]

    def perform_create(self, serializer):
        number = self.request.data.get("number")
        if not number:
            raise ValidationError("Number is required")

        if Flow.objects.filter(number=number).exists():
            raise ValidationError("Flow with this number already exists")

        serializer.save(number=number)

    def perform_update(self, serializer):
        number = self.request.data.get("number")
        if not number:
            raise ValidationError("Number is required")

        if Flow.objects.filter(number=number).exclude(pk=self.get_object().pk).exists():
            raise ValidationError("Flow with this number already exists")

        serializer.save(number=number)


class EventAPIView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventSerializer

    def get(self, request):
        """
        Get all events for the user.
        """
        user = request.user
        if user.role == "teacher":
            lessons = Lesson.objects.filter(teacher=user)
            meetings = Meeting.objects.all()
            events = sorted(
                list(lessons) + list(meetings), key=lambda event: event.start_time
            )
        elif user.role == "curator":
            events = Lesson.objects.filter(group__curator=user)
        else:
            lessons = Lesson.objects.all()
            meetings = Meeting.objects.all()
            events = sorted(
                list(lessons) + list(meetings), key=lambda event: event.start_time
            )

        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsSuperadminOrSupervisor()]
        return [IsAuthenticated()]

    def get_queryset(self):
        if self.request.user.role == "teacher":
            return Lesson.objects.filter(teacher=self.request.user)
        return Lesson.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = LessonOutputSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        lesson = Lesson.objects.get(pk=pk)
        serializer = LessonOutputSerializer(lesson)
        return Response(serializer.data)

    def perform_create(self, serializer):
        print(self.request.data)
        flow = self.request.data.get("flow")
        group = self.request.data.get("group")
        teacher = self.request.data.get("teacher")
        start_time = self.request.data.get("start_time")
        end_time = self.request.data.get("end_time")
        number_of_students = self.request.data.get("number_of_students")

        try:
            start_time = parse(start_time)
            end_time = parse(end_time)
        except ValueError:
            raise ValidationError(
                "Invalid date format. Ensure it follows ISO 8601 format."
            )

        if Lesson.objects.filter(
            teacher=teacher,
            start_time__lt=end_time,  # Start time of existing lesson is before the new lesson ends
            end_time__gt=start_time,
        ).exists():
            raise ValidationError(
                "This teacher already has a lesson scheduled during this time."
            )

        if Lesson.objects.filter(
            group=group,
            teacher=teacher,
            start_time=start_time,
            end_time=end_time,
            flow=flow,
        ).exists():
            raise ValidationError("Lesson with this data already exists.")

        serializer.save()

    @action(detail=False, methods=["post"])
    def parse_lessons(self, request):
        text = request.data.get("text", "")
        if not text:
            return Response(
                {"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            lessons = LessonService.parse_lessons_from_text(text)
            LessonService.create_lessons(lessons)

            serializer = LessonOutputSerializer(lessons, many=True)
            return Response(
                {"lessons": serializer.data, "message": "Lessons created successfully"},
                status=status.HTTP_201_CREATED,
            )

        except ValidationError as e:
            return Response(
                {
                    "error": str(e),
                    "details": e.message_dict if hasattr(e, "message_dict") else None,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=False, methods=["post"])
    def check_parsing(self, request):
        text = request.data.get("text", "")
        if not text:
            return Response(
                {"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            lessons = LessonService.parse_lessons_from_text(text)
            serializer = LessonOutputSerializer(lessons, many=True)
            return Response(
                {"lessons": serializer.data, "message": "Lessons parsed successfully"},
                status=status.HTTP_200_OK,
            )

        except ValidationError as e:
            return Response(
                {
                    "error": str(e),
                    "details": e.message_dict if hasattr(e, "message_dict") else None,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"error": "An unexpected error occurred", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class MeetingViewSet(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsSuperadminOrSupervisor()]
        return [IsAuthenticated()]

    def create(self, request):
        users = request.data.get("participants")
        if not users or not isinstance(users, list):
            raise ValidationError("A list of user IDs is required for 'participants'.")

        participants = User.objects.filter(pk__in=users)
        if len(participants) != len(users):
            invalid_ids = set(users) - set(participants.values_list("id", flat=True))
            raise ValidationError(f"Invalid participant IDs: {invalid_ids}")

        name = request.data.get("name")
        start_time = request.data.get("start_time")
        end_time = request.data.get("end_time")

        if not name or not start_time or not end_time:
            raise ValidationError("Name, start_time, and end_time are required.")

        try:
            start_time = parse(start_time)
            end_time = parse(end_time)
        except ValueError:
            raise ValidationError("Invalid date format. Use ISO 8601 format.")

        if end_time <= start_time:
            raise ValidationError("End time must be later than start time.")

        if Meeting.objects.filter(
            start_time__lt=end_time,
            end_time__gt=start_time,
        ).exists():
            raise ValidationError("This meeting overlaps with another meeting.")

        if Meeting.objects.filter(
            name=name,
            start_time=start_time,
            end_time=end_time,
        ).exists():
            raise ValidationError(
                "A meeting with the same name, start_time, and end_time already exists."
            )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        meeting = serializer.save()

        meeting.participants.set(participants)
        meeting.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        # TODO: Implement permissions for meetings
        if (
            self.request.user.role == "superadmin"
            or self.request.user.role == "supervisor"
        ):
            return Meeting.objects.all()
        user = self.request.user
        return Meeting.objects.filter(participants=user)
