from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from .utils import generate_password

from users.permissions import IsSuperadminUser, IsCuratorUser, IsTeacherUser, IsSupervisorUser
from .models import User
from .serializers import CustomTokenObtainPairSerializer, UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class BaseAddUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = None
    role = None

    def perform_create(self, serializer):
        email = self.request.data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError('User with this email already exists')
        
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')
        if not first_name or not last_name:
            raise ValidationError('First name and last name are required')
        
        password = generate_password()
        print(f"Generated password: {password}")

        serializer.save(
            email=email,
            first_name=first_name,
            last_name=last_name,
            role=self.role,
            password=password
        )


class AddSupervisorView(BaseAddUserView):
    permission_classes = [IsAuthenticated, IsSuperadminUser]
    
    role = 'supervisor'


class AddCuratorView(BaseAddUserView):
    permission_classes = [IsAuthenticated, IsSuperadminUser, IsSupervisorUser]
    role = 'curator'


class AddTeacherView(BaseAddUserView):
    permission_classes = [IsAuthenticated, IsCuratorUser, IsSupervisorUser]
    role = 'teacher'
