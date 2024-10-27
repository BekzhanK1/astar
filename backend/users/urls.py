from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CreateLessonsAPIView,
    CustomTokenObtainPairView,
    GroupViewSet, 
    UserProfileView, 
    UserViewSet, 
    FlowViewSet
)
from rest_framework_simplejwt.views import TokenRefreshView

# Set up the router for User and Flow viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'flows', FlowViewSet, basename='flow')
router.register(r'groups', GroupViewSet, basename='group')

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserProfileView.as_view(), name='profile'),
    path('lessons/', CreateLessonsAPIView.as_view(), name='lessons'),
    path('', include(router.urls)),  # Include all routes from the router
]
