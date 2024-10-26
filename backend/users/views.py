from rest_framework import viewsets, mixins, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView
from users.permissions import IsSuperadminUser, IsSupervisorUser, IsCuratorUser
from .models import Group, User, Flow, ROLE_CHOICES
from .serializers import CustomTokenObtainPairSerializer, GroupSerializer, UserSerializer, FlowSerializer

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
        if self.action in ['create', 'destroy']:
            if self.request.data.get('role') == 'supervisor':
                self.permission_classes = [IsAuthenticated, IsSuperadminUser]
            else:
                self.permission_classes = [IsAuthenticated, (IsSuperadminUser | IsSupervisorUser)]
        elif self.action in ['list', 'retrieve']:
            self.permission_classes = [IsAuthenticated, (IsSuperadminUser | IsSupervisorUser)]
        return super().get_permissions()
    
    
    def list(self, request, *args, **kwargs):
        """
        Override the list method to filter users based on role if specified in the query params.
        """
        role = request.query_params.get('role')
        if role:
            self.queryset = self.queryset.filter(role=role)
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        role = self.request.data.get('role')
        email = self.request.data.get('email')
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')

        if User.objects.filter(email=email).exists():
            raise ValidationError('User with this email already exists')

        serializer.save(
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=role
        )

    def get_queryset(self):
        """
        Filter queryset based on role if specified in the query params.
        """
        role = self.request.query_params.get('role')
        if role:
            return self.queryset.filter(role=role)
        return self.queryset


class FlowViewSet(viewsets.ModelViewSet):
    """
    ModelViewSet for managing flows.
    """
    queryset = Flow.objects.all()
    serializer_class = FlowSerializer
    permission_classes = [IsAuthenticated, (IsSuperadminUser | IsSupervisorUser)]

    def perform_create(self, serializer):
        number = self.request.data.get('number')
        if not number:
            raise ValidationError('Number is required')
        
        if Flow.objects.filter(number=number).exists():
            raise ValidationError('Flow with this number already exists')
        
        serializer.save(number=number)

    def perform_update(self, serializer):
        number = self.request.data.get('number')
        if not number:
            raise ValidationError('Number is required')
        
        if Flow.objects.filter(number=number).exclude(pk=self.get_object().pk).exists():
            raise ValidationError('Flow with this number already exists')
        
        serializer.save(number=number)

class GroupViewSet(viewsets.ModelViewSet):
    """
    ModelViewSet for managing groups.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated, (IsSuperadminUser | IsSupervisorUser | IsCuratorUser)]

    def perform_create(self, serializer):
        code = self.request.data.get('code')
        level = self.request.data.get('level')
        flow = self.request.data.get('flow')
        curator = self.request.data.get('curator')

        if Group.objects.filter(code=code, flow=flow, level=level).exists():
            raise ValidationError('Group with this code already exists')

        serializer.save(code=code, level=level, flow=flow, curator=curator)

    def perform_update(self, serializer):
        code = self.request.data.get('code')
        level = self.request.data.get('level')
        flow = self.request.data.get('flow')
        curator = self.request.data.get('curator')

        if Group.objects.filter(code=code).exclude(pk=self.get_object().pk).exists():
            raise ValidationError('Group with this code already exists')

        serializer.save(
            code=code,
            level=level,
            flow=flow,
            curator=curator
        )
        
class CreateLessonsAPIView(generics.CreateAPIView):
    """
    CreateAPIView for creating lessons.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated, (IsSuperadminUser | IsSupervisorUser | IsCuratorUser)]
    
    def perform_create(self, serializer):
        pass
        # serializer.save(
        #     date_time=date_time,
        #     group=group,
        #     teacher=teacher,
        #     lesson_link=lesson_link,
        #     number_of_students=number_of_students
        # )
