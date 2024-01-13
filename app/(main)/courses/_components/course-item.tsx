import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import toast from "react-hot-toast";
import ConfirmationModal from "./modal-delete-confirmation";
import { Badge } from "@/components/ui/badge";
import { EditCourseModal } from "./course-edit";

interface CourseItemProps {
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
}

export const CourseItem = ({
  title,
  description,
  link,
  status,
  _id,
}: CourseItemProps) => {
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
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="destructive">{status}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Link href={`/courses/edit/${_id}`}>
            <Button variant="outline">Edit</Button>
          </Link> */}

          <EditCourseModal
            courseTitle={title}
            courseDescription={description}
            courseLink={link}
            courseStatus={status}
            courseId={_id}
          />
          <Link href={link}>
            <Button>Visit</Button>
          </Link>

          <ConfirmationModal onConfirm={confirmDelete} />
        </CardFooter>
      </Card>
    </>
  );
};
