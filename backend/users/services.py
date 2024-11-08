# services/lesson_service.py
import re
from datetime import datetime, date
from typing import List
from django.core.exceptions import ValidationError
from .models import Lesson, User, Flow


class LessonService:
    @staticmethod
    def parse_lessons_from_text(text: str) -> List[Lesson]:
        lesson_pattern = re.compile(
            r"(https://meet\.google\.com/\S+)\n"  # Lesson link
            r"(\d+\.\d) ([A-Z]+) ([A-Z]+) ([A-Z0-9-]+)\s*\n"  # Flow number, curator name, combined group
            r"[^\n]+ ([A-Z]+) ([A-Z]+)\s*\n"  # Teacher name
            r"(\d{2}:\d{2})-(\d{2}:\d{2})\s*\n"  # Start and end times
            r"[^\n]+: (\d+)"  # Number of students
        )
        lessons = []
        matches = list(lesson_pattern.finditer(text))

        if not matches:
            raise ValidationError("No valid lesson entries found in the input text.")

        for match in matches:
            try:
                (
                    lesson_link,
                    flow_number,
                    curator_first_name,
                    curator_last_name,
                    group,
                    teacher_first_name,
                    teacher_last_name,
                    start_time,
                    end_time,
                    number_of_students,
                ) = match.groups()

                # Print all fields for debugging
                print(f"Lesson Link: {lesson_link}")
                print(f"Flow Number: {flow_number}")
                print(f"Curator First Name: {curator_first_name}")
                print(f"Curator Last Name: {curator_last_name}")
                print(f"Group: {group}")
                print(f"Teacher First Name: {teacher_first_name}")
                print(f"Teacher Last Name: {teacher_last_name}")
                print(f"Start Time: {start_time}")
                print(f"End Time: {end_time}")
                print(f"Number of Students: {number_of_students}")

                # Validate each field explicitly
                missing_fields = [
                    field_name
                    for field_name, value in zip(
                        [
                            "lesson_link",
                            "flow_number",
                            "curator_first_name",
                            "curator_last_name",
                            "group",
                            "teacher_first_name",
                            "teacher_last_name",
                            "start_time",
                            "end_time",
                            "number_of_students",
                        ],
                        [
                            lesson_link,
                            flow_number,
                            curator_first_name,
                            curator_last_name,
                            group,
                            teacher_first_name,
                            teacher_last_name,
                            start_time,
                            end_time,
                            number_of_students,
                        ],
                    )
                    if not value
                ]

                if missing_fields:
                    raise ValueError(
                        f"Missing required fields: {', '.join(missing_fields)}"
                    )

            except ValueError as e:
                raise ValidationError(f"Invalid text format: {e}")

            flow_number = int(float(flow_number))
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

            start_time = datetime.combine(
                today, datetime.strptime(start_time, "%H:%M").time()
            )
            end_time = datetime.combine(
                today, datetime.strptime(end_time, "%H:%M").time()
            )

            if Lesson.objects.filter(
                teacher=teacher,
                start_time__lt=end_time,
                end_time__gt=start_time,
            ).exists():
                raise ValidationError(
                    f"Teacher {teacher_first_name} {teacher_last_name.capitalize()} already has a lesson at this time"
                )

            lesson = Lesson(
                flow=flow,
                group=group,
                teacher=teacher,
                start_time=start_time,
                end_time=end_time,
                event_link=lesson_link,
                number_of_students=int(number_of_students),
            )
            lessons.append(lesson)

        return lessons

    @staticmethod
    def create_lessons(lessons: List[Lesson]):
        for lesson in lessons:
            lesson.save()
        return lessons
