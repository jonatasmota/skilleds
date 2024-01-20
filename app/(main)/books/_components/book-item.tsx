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
import { BookCheck, Bookmark, Layers3 } from "lucide-react";

interface BookItemProps {
  id: string;
  author: string;
  subject: string;
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
  onStatusChange: (newStatus: string) => void;
}

export const BookItem = ({
  title,
  description,
  link,
  status,
  _id,
  author,
  subject,
  id,
  onStatusChange,
}: BookItemProps) => {
  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/books/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        console.log("Status updated successfully");
        toast.success("Status updated successfully");
        onStatusChange(newStatus); // Chama a função passada como propriedade
      } else {
        console.log("Error updating status");
        toast.error("Error updating status");
      }
    } catch (error) {
      console.log("Error updating status", error);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/books?id=${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Book deleted successfully");
        toast.success("Book deleted successfully");
        window.location.reload();
      } else {
        console.log("Error deleting book");
        toast.error("Error deleting book");
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
          <Badge>{status}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="inline-flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleStatusChange("reading")}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleStatusChange("to-read")}
            >
              <Layers3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => handleStatusChange("done")}
            >
              <BookCheck className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
