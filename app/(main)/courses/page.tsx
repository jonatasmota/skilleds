/* eslint-disable react/jsx-key */
"use client";

import { useEffect, useState } from "react";
import { CourseItem } from "./_components/course-item";
import { AddCourse } from "./_components/course-modal";

interface Course {
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const courseFetch = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    courseFetch();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-24 pb-10">
      <div className="w-full flex items-center justify-center md:items-center md:justify-start gap-x-9">
        <h1 className="text-3xl p-10 text-gray-800 dark:text-gray-300 font-bold">
          Courses
        </h1>

        <AddCourse />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
        {courses.map((course: Course) => {
          console.log(course);
          return (
            <CourseItem
              key={course._id}
              title={course.title}
              description={course.description}
              link={course.link}
              status={course.status}
              _id={course._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
