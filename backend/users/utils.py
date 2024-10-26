

import random
import string

from users.models import Lesson


def generate_password() -> str:
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

def parse_lessons_from_text(text: str) -> list[Lesson]:
    pass