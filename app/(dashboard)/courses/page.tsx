"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import CourseItem from "./_components/course-item";
import SearchInput from "../_components/search";
import { Pagination } from "../_components/pagination";
import { AddCourse } from "./_components/add-course";

import { Spinner } from "@/components/spinner-loading";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { File } from "lucide-react";

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
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusSearchPerformed, setStatusSearchPerformed] = useState(false);

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
    setStatusSearchPerformed(false);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    setStatusSearchPerformed(true);
    let filtered;
    if (status === "all" || status === null) {
      filtered = courses;
    } else {
      filtered = courses.filter((course) => course.status === status);
    }
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredCourses
    ? filteredCourses.slice(firstItemIndex, lastItemIndex)
    : [];

  return (
    <div className="h-full container pb-8">
      <div className="mb-8 space-y-4 flex flex-col md:flex-row xl:flex-row justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl md:text-4xl font-bold">Your courses</h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg">
            Here you can add and find all your courses.
          </p>
        </div>

        <AddCourse />
      </div>

      {currentItems.length < 1 && !isLoading ? (
        statusSearchPerformed ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <File className="w-10 h-10 text-primary-500" />
            </div>
            <h2 className="text-xl mt-6 font-semibold">
              No courses found with that status
            </h2>
            <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
              You can return to the full list by clicking the button below.
            </p>
            <Button variant="success" onClick={() => handleStatusFilter("all")}>
              Return to full list
            </Button>
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <File className="w-10 h-10 text-primary-500" />
            </div>
            <h2 className="text-xl mt-6 font-semibold">
              You don&apos;t have added any courses yet
            </h2>
            <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
              You can add a new course by clicking the button below.
            </p>

            <AddCourse />
          </div>
        )
      ) : (
        <>
          <div className="flex flex-col justify-center items-center sm:flex-row flex-wrap sm:justify-between gap-2 mt-4">
            <SearchInput onSearchChange={handleSearchChange} />

            <div className="flex gap-x-2 pt-4 sm:pt-0 mx-auto md:mx-0">
              <Button
                onClick={() => handleStatusFilter("all")}
                variant="outline"
              >
                All
              </Button>
              <Button
                onClick={() => handleStatusFilter("doing")}
                variant="secondary"
              >
                Doing
              </Button>
              <Button
                onClick={() => handleStatusFilter("willdo")}
                variant="destructive"
              >
                Will Do
              </Button>
              <Button
                onClick={() => handleStatusFilter("done")}
                variant="success"
              >
                Done
              </Button>
            </div>

            {filteredCourses && itemsPerPage < filteredCourses.length && (
              <Pagination
                totalItems={filteredCourses.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>

          <div className="mt-8">
            <div className=" space-y-2">
              {currentItems.map((course) => (
                <CourseItem key={course._id} course={course} _id={course._id} />
              ))}
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Courses;
