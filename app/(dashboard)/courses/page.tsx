"use client";

import { useEffect, useState } from "react";

import SearchInput from "../_components/search";
import { Pagination } from "../_components/pagination";

import { Spinner } from "@/components/spinner-loading";

import toast from "react-hot-toast";
import { AddCourse } from "./_components/add-course";
import CourseItem from "./_components/course-item";

interface Course {
  id: string;
  author: string;
  subject: string;
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
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

  // const handleStatusChange = async (id: string, newStatus: string) => {
  //   try {
  //     console.log("Changing status...", id, newStatus);

  //     const res = await fetch(`/api/Courses/${id}`, {
  //       method: "PUT",
  //       body: JSON.stringify({ status: newStatus }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (res.ok) {
  //       setCourses((prevCourses) =>
  //         prevCourses.map((Course) =>
  //           Course._id === id ? { ...Course, status: newStatus } : Course
  //         )
  //       );

  //       setFilteredCourses((prevCourses) =>
  //         prevCourses.map((Course) =>
  //           Course._id === id ? { ...Course, status: newStatus } : Course
  //         )
  //       );
  //     } else {
  //       console.log("Error changing status");
  //       toast.error("Error changing status");
  //     }
  //   } catch (error) {
  //     console.error("Error changing status:", error);
  //   }
  // };

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
  const currentItems = filteredCourses
    ? filteredCourses.slice(firstItemIndex, lastItemIndex)
    : [];

  // const getStatusDisplayName = (status: string): string => {
  //   switch (status) {
  //     case "to-read":
  //       return "To Read";
  //     case "reading":
  //       return "Reading";
  //     case "done":
  //       return "Done";
  //     default:
  //       return status;
  //   }
  // };

  // const getStatuses = () =>
  //   Array.from(new Set(filteredCourses.map((Course) => Course.status)));

  return (
    <div className="h-full container p-4">
      <div className="mt-20 justify-center gap-4 md:mt-0 flex flex-1 md:justify-between">
        <AddCourse />
        <SearchInput onSearchChange={handleSearchChange} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <>
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((course) => (
                <CourseItem key={course._id} course={course} _id={course._id} />
              ))}
            </div>
          </div>
        </>
      )}

      {filteredCourses && itemsPerPage < filteredCourses.length && (
        <div className="text-center md:container pt-8">
          <Pagination
            totalItems={filteredCourses.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Courses;
