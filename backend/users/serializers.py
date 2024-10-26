import re
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from users.utils import generate_password
from .models import LEVEL_CHOICES, Flow, Group, User, ROLE_CHOICES
from rest_framework.exceptions import ValidationError

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['role'] = user.role
        token['email'] = user.email
        return token

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'role')
        read_only_fields = ('id', 'flow')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("User with this email already exists.")
        return value

    def validate_role(self, value):
        if value not in dict(ROLE_CHOICES):
            raise ValidationError("Invalid role. Please select a valid role.")
        return value

    def validate(self, data):
        required_fields = ['email', 'first_name', 'last_name', 'role']
        for field in required_fields:
            if not data.get(field):
                raise ValidationError(f"{field.replace('_', ' ').capitalize()} is required.")
        return data

    def create(self, validated_data):
        # password = generate_password()
        password = 'qwerty'
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class FlowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flow
        fields = '__all__'
        read_only_fields = ('id', 'start_date')
        
class GroupSerializer(serializers.ModelSerializer):
    flow = serializers.PrimaryKeyRelatedField(queryset=Flow.objects.all())
    curator = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='curator'))
    code = serializers.CharField()
    def validate_code(self, value):
        if not re.match(r'^(EV|LN)-\d{1,2}$', value):
            raise ValidationError("Code must start with 'EV' or 'LN', followed by a hyphen and 1 or 2 digits (e.g., 'EV-1' or 'EV-01').")
        return value
    
    def validate_level(self, value):
        if value not in dict(LEVEL_CHOICES):
            raise ValidationError("Invalid level. Please select a valid level.")
        return value
    
    def save(self, **kwargs):
        print(self.validated_data)
        Group.objects.create(**self.validated_data)
    class Meta:
        model = Group
        fields = '__all__'
        read_only_fields = ('id',)
        
    
        
