from datetime import datetime, date
import random
import re
import string
from typing import List, NamedTuple

from users.models import Flow, Lesson, User


def generate_password() -> str:
    return "".join(random.choices(string.ascii_letters + string.digits, k=8))
