from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
ROLE_CHOICES = (
    ('superadmin', 'Superadmin'),
    ('supervisor', 'Supervisor'),
    ('curator', 'Curator'),
    ('teacher', 'Teacher'),
)

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    role = models.CharField(_('role'), choices=ROLE_CHOICES, max_length=30, blank=True)
    flow = models.IntegerField(_('flow'), blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return f"{self.email} - {self.role}"
    
