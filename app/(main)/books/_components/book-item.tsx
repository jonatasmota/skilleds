import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCheck, Bookmark, Layers3 } from "lucide-react";
import toast from "react-hot-toast";

import { EditBookModal } from "./edit-book";
import DeleteBookModal from "./delete-book";

interface BookItemProps {
  book: {
    _id: string;
    title: string;
    author: string;
    status: string;
    subject: string;
    description: string;
    link: string;
  };
  _id: string;
  onStatusChange: (id: string, newStatus: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, _id, onStatusChange }) => {
  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/books?id=${_id}`, {
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
    <Card
      key={book._id}
      className="rounded-none first:mt-0 first:rounded-t-lg last:rounded-b-lg"
    >
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <DeleteBookModal onConfirm={confirmDelete} />
          <EditBookModal
            bookAuthor={book.author}
            bookDescription={book.description}
            bookId={book._id}
            bookLink={book.link}
            bookStatus={book.status}
            bookSubject={book.subject}
            bookTitle={book.title}
          />
        </div>
        <div className="inline-flex gap-2">
          <Button
            variant="outline"
            onClick={() => onStatusChange(book._id, "reading")}
            disabled={book.status === "reading"}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onStatusChange(book._id, "to-read")}
            disabled={book.status === "to-read"}
          >
            <Layers3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onStatusChange(book._id, "done")}
            disabled={book.status === "done"}
          >
            <BookCheck className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookItem;
