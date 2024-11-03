from rest_framework.permissions import BasePermission


class IsRoleUser(BasePermission):
    role = None

    def has_permission(self, request, view):
        return request.user.role == self.role


class IsSuperadminUser(IsRoleUser):
    role = "superadmin"


class IsSupervisorUser(IsRoleUser):
    role = "supervisor"


class IsCuratorUser(IsRoleUser):
    role = "curator"


class IsTeacherUser(IsRoleUser):
    role = "teacher"


class IsSuperadminOrSupervisor(BasePermission):
    def has_permission(self, request, view):
        print(request.user.role)
        return request.user.role in ["superadmin", "supervisor"]
