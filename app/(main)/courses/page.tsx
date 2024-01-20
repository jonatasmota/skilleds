"use client";

import { useEffect, useState } from "react";
import { CourseItem } from "./_components/course-item";
import { AddCourse } from "./_components/course-modal";
import { Pagination } from "../_components/pagination";
import { Spinner } from "@/components/spinner-loading";
import SearchInput from "../_components/search";
import toast from "react-hot-toast";

interface Course {
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
}

const Courses = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const courseFetch = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
      setFilteredCourses(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching courses");
      console.log(error);
    }
  };

  useEffect(() => {
    courseFetch();
  }, [currentPage]);

  const handleSearchChange = (searchValue: string) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredCourses.slice(firstItemIndex, lastItemIndex);

  return (
    <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 pb-20">
      <div className="w-full flex container p-4 items-center justify-between md:items-center md:justify-between gap-x-9">
        {/* <h1 className="text-3xl text-gray-800 dark:text-gray-300 font-bold">
          Courses
        </h1> */}
        <div className="mt-20 justify-center gap-4 md:mt-0 flex flex-1 md:justify-between">
          <AddCourse />
          <SearchInput onSearchChange={handleSearchChange} />
        </div>
      </div>

      {isLoading && (
        <div className="w-fit flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="w-fit grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 justify-items-start justify-start gap-y-4 gap-x-4 md:gap-x-2 mt-2 mb-5 text-center">
            {currentItems.map((course: Course) => {
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
        </>
      )}
      <div className="text-center md:container">
        <Pagination
          totalItems={filteredCourses.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Courses;
