from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomTokenObtainPairView,
    EventAPIView,
    GroupViewSet,
    LessonViewSet,
    UserProfileView,
    UserViewSet,
    FlowViewSet,
)
from rest_framework_simplejwt.views import TokenRefreshView

# Set up the router for User and Flow viewsets
router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"flows", FlowViewSet, basename="flow")
router.register(r"groups", GroupViewSet, basename="group")
router.register(r"lessons", LessonViewSet, basename="lesson")

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("events/", EventAPIView.as_view(), name="events"),
    path("me/", UserProfileView.as_view(), name="profile"),
    path("", include(router.urls)),
]
