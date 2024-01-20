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
import { Badge } from "@/components/ui/badge";
import { EditCourseModal } from "./edit-course";
import { ExternalLink } from "lucide-react";
import DeleteCourseModal from "./delete-course";

interface CourseItemProps {
  title: string;
  description: string;
  link: string;
  status: string;
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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant={getStatusVariant(status) || "secondary"}>
            {status}
          </Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            href={link.startsWith("http") ? link : `http://${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="success">
              <ExternalLink className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex gap-2">
            <EditCourseModal
              courseTitle={title}
              courseDescription={description}
              courseLink={link}
              courseStatus={status}
              courseId={_id}
            />

            <DeleteCourseModal onConfirm={confirmDelete} />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
