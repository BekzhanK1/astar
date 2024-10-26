from django.contrib import admin
from users.models import User, Flow, Group
# Register your models here.

admin.site.register(User)
admin.site.register(Flow)
admin.site.register(Group)
