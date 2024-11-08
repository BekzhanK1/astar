from django.contrib import admin
from users.models import User, Flow, Lesson, Meeting

admin.site.register(User)
admin.site.register(Flow)
admin.site.register(Lesson)
admin.site.register(Meeting)
