import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const getStatusVariant = (status: string) => {
  switch (status) {
    case "doing":
      return "success"; // ou qualquer outra variante desejada
    case "willdo":
      return "info"; // ou qualquer outra variante desejada
    case "applied":
      return "outline"; // ou qualquer outra variante desejada
    case "wanttodo":
      return "destructive"; // ou qualquer outra variante desejada
    default:
      return "default"; // ou qualquer outra variante padrão
  }
};

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
        className="rounded-none first:mt-0 first:rounded-t-lg last:rounded-b-lg"
      >
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant={getStatusVariant(status) || "secondary"}>
            {status}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
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
        </CardFooter>
      </Card>
    </>
  );
};

export default CourseItem;
