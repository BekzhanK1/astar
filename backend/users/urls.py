from django.urls import path
from .views import AddSupervisorView, AddCuratorView, AddTeacherView, CustomTokenObtainPairView, UserProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserProfileView.as_view(), name='profile'),
    path('add-supervisor/', AddSupervisorView.as_view(), name='add_supervisor'),
    path('add-teacher/', AddTeacherView.as_view(), name='add_teacher'),
    path('add-curator/', AddCuratorView.as_view(), name='add_curator'),
]
