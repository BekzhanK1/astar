from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class EventType(models.TextChoices):
    LESSON = "lesson", _("Lesson")
    MEETING = "meeting", _("Meeting")


ROLE_CHOICES = (
    ("superadmin", "Superadmin"),
    ("supervisor", "Supervisor"),
    ("curator", "Curator"),
    ("teacher", "Teacher"),
)

LEVEL_CHOICES = (
    ("elementary", "Elementary"),
    ("pre-intermediate", "Pre-intermediate"),
    ("intermediate", "Intermediate"),
    ("upper-intermediate", "Upper-intermediate"),
)


class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=30, blank=True)
    last_name = models.CharField(_("last name"), max_length=30, blank=True)
    role = models.CharField(_("role"), choices=ROLE_CHOICES, max_length=30, blank=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return f"ID: {self.pk} {self.email} - {self.role}"


class Flow(models.Model):
    number = models.PositiveIntegerField(_("number"), unique=True)
    start_date = models.DateField(_("start date"), auto_now_add=True)

    def __str__(self):
        return f"Flow: {self.number} (Started: {self.start_date})"


class Event(models.Model):
    start_time = models.DateTimeField(_("start time"), blank=True)
    end_time = models.DateTimeField(_("end time"), blank=True)
    event_type = models.CharField(
        max_length=10,
        choices=EventType.choices,
        default=EventType.LESSON,
    )
    event_link = models.URLField(_("event link"), blank=True, null=True)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"{self.name} | Start: {self.start_time} | End: {self.end_time}"


class Lesson(Event):
    flow = models.ForeignKey(Flow, on_delete=models.CASCADE, related_name="lessons")
    group = models.TextField(_("group"), blank=False)
    teacher = models.ForeignKey(
        User,
        limit_choices_to={"role": "teacher"},
        on_delete=models.CASCADE,
        related_name="lessons",
    )
    number_of_students = models.PositiveIntegerField(_("number of students"), default=0)

    def __str__(self) -> str:
        return f"Lesson: {self.start_time} - {self.end_time} | Group: {self.group} | Teacher: {self.teacher.email}"


class Meeting(Event):
    name = models.TextField(_("name"), blank=False)
    participants = models.ManyToManyField(User, related_name="meetings")

    def __str__(self) -> str:
        return f"Meeting: {self.name} | Start: {self.start_time} | End: {self.end_time}"


