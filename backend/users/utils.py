

from datetime import datetime
import random
import re
import string
from typing import List, NamedTuple

from users.models import Flow, Group, Lesson, User


def generate_password() -> str:
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

class LessonData(NamedTuple):
    lesson_link: str
    flow_number: float
    curator_first_name: str
    curator_last_name: str
    group_level: str
    group_code: str
    teacher_first_name: str
    teacher_last_name: str
    start_time: str
    end_time: str
    number_of_students: int

def parse_lessons_from_text(text: str) -> List[LessonData]:
    lessons = []
    # Regular expression to parse each lesson's information
    lesson_pattern = re.compile(
        r"(https://meet\.google\.com/\S+)\n"                       # Lesson link
        r"(\d+\.\d) ([A-Z]+) ([A-Z]+) ([A-Z]+) ([A-Z0-9-]+)\s*\n" # Flow number, curator name, level, and group code
        r"[^\n]+ ([A-Z]+) ([A-Z]+)\s*\n"                          # Teacher name
        r"(\d{2}:\d{2})-(\d{2}:\d{2})\s*\n"                      # Start and end times
        r"[^\n]+: (\d+)"                                          # Number of students
    )

    for match in lesson_pattern.finditer(text):
        lesson_link = match.group(1)
        flow_number = int(float(match.group(2)))
        curator_first_name = match.group(3).capitalize()
        curator_last_name = match.group(4).capitalize()
        group_level = match.group(5).capitalize()
        group_code = match.group(6)
        teacher_first_name = match.group(7).capitalize()
        teacher_last_name = match.group(8).capitalize()
        start_time = match.group(9)
        end_time = match.group(10)
        number_of_students = int(match.group(11))

        # Append the parsed data as a LessonData named tuple
        lessons.append(LessonData(
            lesson_link, flow_number, curator_first_name, curator_last_name,
            group_level, group_code, teacher_first_name, teacher_last_name,
            start_time, end_time, number_of_students
        ))

    for lesson in lessons:
        print(lesson.lesson_link)
        print(lesson.flow_number)
        print(lesson.curator_first_name)
        print(lesson.curator_last_name)
        print(lesson.group_level)
        print(lesson.group_code)
        print(lesson.teacher_first_name)
        print(lesson.teacher_last_name)
        print(lesson.start_time)
        print(lesson.end_time)
        print(lesson.number_of_students)
        print("-------------------------------")
    return lessons