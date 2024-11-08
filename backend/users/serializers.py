import re
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from users.utils import generate_password
from .models import LEVEL_CHOICES, Flow, Lesson, Meeting, User, ROLE_CHOICES
from rest_framework.exceptions import ValidationError


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        token["email"] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["role"] = self.user.role
        return data


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "role")
        read_only_fields = ("id", "flow")

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("User with this email already exists.")
        return value

    def validate_role(self, value):
        if value not in dict(ROLE_CHOICES):
            raise ValidationError("Invalid role. Please select a valid role.")
        return value

    def create(self, validated_data):
        # password = generate_password()
        password = "qwerty"
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.role = validated_data.get("role", instance.role)
        instance.save()
        return instance


class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        fields = "__all__"
        read_only_fields = ("id", "start_date")


# class GroupSerializer(serializers.ModelSerializer):
#     flow = serializers.PrimaryKeyRelatedField(queryset=Flow.objects.all())
#     curator = serializers.PrimaryKeyRelatedField(
#         queryset=User.objects.filter(role="curator")
#     )
#     code = serializers.CharField()

#     def validate_code(self, value):
#         if not re.match(r"^(EV|LN)-\d{1,2}$", value):
#             raise ValidationError(
#                 "Code must start with 'EV' or 'LN', followed by a hyphen and 1 or 2 digits (e.g., 'EV-1' or 'EV-01')."
#             )
#         return value

#     def validate_level(self, value):
#         if value not in dict(LEVEL_CHOICES):
#             raise ValidationError("Invalid level. Please select a valid level.")
#         return value

#     def save(self, **kwargs):
#         print(self.validated_data)
#         Group.objects.create(**self.validated_data)

#     class Meta:
#         model = Group
#         fields = "__all__"
#         read_only_fields = ("id",)


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"
        read_only_fields = ("id",)


class LessonOutputSerializer(serializers.ModelSerializer):
    teacher_first_name = serializers.CharField(source="teacher.first_name")
    teacher_last_name = serializers.CharField(source="teacher.last_name")
    teacher_email = serializers.CharField(source="teacher.email")
    flow_number = serializers.IntegerField(source="flow.number")

    class Meta:
        model = Lesson
        fields = "__all__"


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"
        read_only_fields = ("id",)


class EventSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    event_type = serializers.CharField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    event_link = serializers.URLField(allow_null=True, required=False)
    flow = serializers.CharField(required=False, source="group.flow.number")
    group = serializers.CharField(source="lesson.group", required=False)
    name = serializers.CharField(required=False)
    teacher_email = serializers.CharField(required=False, source="teacher.email")
    teacher_first_name = serializers.CharField(
        required=False, source="teacher.first_name"
    )
    teacher_last_name = serializers.CharField(
        required=False, source="teacher.last_name"
    )

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if isinstance(instance, Lesson):
            representation["group"] = instance.group
            representation["event_type"] = "Lesson"
            representation.pop("name", None)
        elif isinstance(instance, Meeting):
            representation["event_type"] = "Meeting"
            representation.pop("group", None)
        return representation
