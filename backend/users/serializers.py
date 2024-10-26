from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['role'] = user.role
        token['email'] = user.email
        return token

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        min_length=6, write_only=True, required=False)
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'role', 'flow', 'password')
        read_only_fields = ('id', 'role', 'flow')
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
        
