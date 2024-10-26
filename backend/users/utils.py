

import random
import string


def generate_password() -> str:
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

generate_password()
