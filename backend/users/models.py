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

LEVEL_CHOICES = (
    ('elementary', 'Elementary'),
    ('pre-intermediate', 'Pre-intermediate'),
    ('intermediate', 'Intermediate'),
    ('upper-intermediate', 'Upper-intermediate'),
)

class User(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    role = models.CharField(_('role'), choices=ROLE_CHOICES, max_length=30, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return f"ID: {self.pk} {self.email} - {self.role}"
    
class Flow(models.Model):
    number = models.PositiveIntegerField(_('number'), unique=True)
    start_date = models.DateField(_('start date'), auto_now_add=True)
    def __str__(self):
        return f"Flow: {self.number} (Started: {self.start_date})"
    
class Group(models.Model):
    code = models.CharField(_('code'), max_length=30, unique=True)
    level = models.CharField(_('level'), max_length=30)
    flow = models.ForeignKey(Flow, on_delete=models.CASCADE, related_name='groups')
    curator = models.ForeignKey(
        User, 
        limit_choices_to={'role': 'curator'}, 
        on_delete=models.CASCADE, 
        related_name='curated_groups'
    )
    
    def __str__(self):
        return f"Group: {self.code} - {self.level} - {self.flow} | Curator: {self.curator.email}"
    
class Lesson(models.Model):
    date_time = models.DateTimeField(_('date and time'))
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='lessons')
    teacher = models.ForeignKey(User,limit_choices_to={'role': 'teacher'}, on_delete=models.CASCADE, related_name='lessons')
    lesson_link = models.URLField(_('lesson link'), max_length=200)
    