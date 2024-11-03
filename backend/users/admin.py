from django.contrib import admin
from users.models import User, Flow, Group, Lesson, Meeting

admin.site.register(User)
admin.site.register(Flow)
admin.site.register(Group)
admin.site.register(Lesson)
admin.site.register(Meeting)
