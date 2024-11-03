# services/lesson_service.py
import re
from datetime import datetime, date
from typing import List
from django.core.exceptions import ValidationError
from .models import Lesson, Group, User, Flow


class LessonService:
    @staticmethod
    def parse_lessons_from_text(text: str) -> List[Lesson]:
        lesson_pattern = re.compile(
            r"(https://meet\.google\.com/\S+)\n"  # Lesson link
            r"(\d+\.\d) ([A-Z]+) ([A-Z]+) ([A-Z]+) ([A-Z0-9-]+)\s*\n"  # Flow number, curator name, level, and group code
            r"[^\n]+ ([A-Z]+) ([A-Z]+)\s*\n"  # Teacher name
            r"(\d{2}:\d{2})-(\d{2}:\d{2})\s*\n"  # Start and end times
            r"[^\n]+: (\d+)"  # Number of students
        )
        lessons = []

        for match in lesson_pattern.finditer(text):
            (
                lesson_link,
                flow_number,
                curator_first_name,
                curator_last_name,
                group_level,
                group_code,
                teacher_first_name,
                teacher_last_name,
                start_time,
                end_time,
                number_of_students,
            ) = match.groups()

            flow_number = int(float(flow_number))
            group_level = (
                "intermediate" if group_level.upper() == "INTER" else "elementary"
            )
            today = date.today()

            flow = Flow.objects.filter(number=flow_number).first()
            if not flow:
                raise ValidationError(f"Flow not found. Flow number: {flow_number}")

            curator = User.objects.filter(
                first_name=curator_first_name.capitalize(),
                last_name=curator_last_name.capitalize(),
                role="curator",
            ).first()
            if not curator:
                raise ValidationError(
                    f"Curator not found. Curator name: {curator_first_name} {curator_last_name}"
                )

            teacher = User.objects.filter(
                first_name=teacher_first_name.capitalize(),
                last_name=teacher_last_name.capitalize(),
                role="teacher",
            ).first()
            if not teacher:
                raise ValidationError(
                    f"Teacher not found. Teacher name: {teacher_first_name} {teacher_last_name}"
                )

            group = Group.objects.filter(
                code=group_code, level=group_level, flow=flow, curator=curator
            ).first()
            if not group:
                raise ValidationError(
                    f"Group not found. Group code: {group_code}. Group level: {group_level}. Group curator: {curator_first_name} {curator_last_name}"
                )

            start_time = datetime.strptime(start_time, "%H:%M").time()
            end_time = datetime.strptime(end_time, "%H:%M").time()

            lesson = Lesson(
                group=group,
                teacher=teacher,
                start_time_date=datetime.combine(today, start_time),
                end_time_date=datetime.combine(today, end_time),
                lesson_link=lesson_link,
                number_of_students=int(number_of_students),
            )
            lessons.append(lesson)

        return lessons

    @staticmethod
    def create_lessons(lessons: List[Lesson]):
        for lesson in lessons:
            lesson.save()
        return lessons
