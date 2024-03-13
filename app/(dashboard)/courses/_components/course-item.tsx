import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import { EditCourseModal } from "./edit-course";
import DeleteCourseModal from "./delete-course";
import React from "react";

interface CourseItemProps {
  course: {
    title: string;
    description: string;
    link: string;
    status: string;
    _id: string;
  };
  _id: string;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, _id }) => {
  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/courses?id=${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Course deleted successfully");
        toast.success("Course deleted successfully");
        window.location.reload();
      } else {
        console.log("Error deleting course");
        toast.error("Error deleting course");
      }
    } catch (error) {
      console.log("Error deleting course", error);
    }
  };

  return (
    <>
      <Card
        key={course._id}
        className="rounded-none flex items-center justify-between p-4 hover:shadow-md transition cursor-pointer first:mt-0 first:rounded-t-lg last:rounded-b-lg"
      >
        <div className="flex flex-col gap-y-2">
          <h2 className="font-semibold">{course.title}</h2>
          <p className="text-sm text-muted-foreground">{course.description}</p>
          <div className="flex items-center gap-6">
            <Badge className="w-fit capitalize">{course.status}</Badge>
            <Link
              href={
                course.link.startsWith("http")
                  ? course.link
                  : `http://${course.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="success">
                <ExternalLink className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex gap-x-4">
          <div className="flex gap-2">
            <EditCourseModal
              courseTitle={course.title}
              courseDescription={course.description}
              courseLink={course.link}
              courseStatus={course.status}
              courseId={course._id}
            />

            <DeleteCourseModal onConfirm={confirmDelete} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default CourseItem;
