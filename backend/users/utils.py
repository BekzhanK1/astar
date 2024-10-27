from datetime import datetime, date
import random
import re
import string
from typing import List, NamedTuple

from users.models import Flow, Group, Lesson, User


def generate_password() -> str:
    return "".join(random.choices(string.ascii_letters + string.digits, k=8))


def parse_lessons_from_text(text: str) -> List[Lesson]:
    lessons = []
    lesson_pattern = re.compile(
        r"(https://meet\.google\.com/\S+)\n"  # Lesson link
        r"(\d+\.\d) ([A-Z]+) ([A-Z]+) ([A-Z]+) ([A-Z0-9-]+)\s*\n"  # Flow number, curator name, level, and group code
        r"[^\n]+ ([A-Z]+) ([A-Z]+)\s*\n"  # Teacher name
        r"(\d{2}:\d{2})-(\d{2}:\d{2})\s*\n"  # Start and end times
        r"[^\n]+: (\d+)"  # Number of students
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
        today = date.today()

        if group_level == "Inter":
            group_level = "intermediate"
        else:
            group_level = "elementary"

        flow = Flow.objects.filter(number=flow_number).first()
        if not flow:
            raise ValueError("Flow not found")

        curator = User.objects.filter(
            first_name=curator_first_name, last_name=curator_last_name, role="curator"
        ).first()
        if not curator:
            raise ValueError("Curator not found")

        teacher = User.objects.filter(
            first_name=teacher_first_name, last_name=teacher_last_name, role="teacher"
        ).first()
        if not teacher:
            raise ValueError("Teacher not found")

        group = Group.objects.filter(
            code=group_code, level=group_level, flow=flow, curator=curator
        ).first()
        if not group:
            raise ValueError("Group not found")

        start_time = datetime.strptime(start_time, "%H:%M").time()
        end_time = datetime.strptime(end_time, "%H:%M").time()
        lesson = Lesson(
            group=group,
            teacher=teacher,
            start_time_date=datetime.combine(today, start_time),
            end_time_date=datetime.combine(today, end_time),
            lesson_link=lesson_link,
            number_of_students=number_of_students,
        )
        lessons.append(lesson)

    for lesson in lessons:
        print(f"Lesson: {lesson.lesson_link}")
        print(lesson.group)
        print(lesson.teacher)
        print(f"Start: {lesson.start_time_date} | End: {lesson.end_time_date}")
        print(f"Students: {lesson.number_of_students}")
        print("-------")
        lesson.save()

    return lessons
