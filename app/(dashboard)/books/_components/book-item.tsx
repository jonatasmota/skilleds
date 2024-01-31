import React from "react";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { BookOpen, BookmarkCheck, LibraryBig } from "lucide-react";
import toast from "react-hot-toast";

import { EditBookModal } from "./edit-book";
import DeleteBookModal from "./delete-book";
import { formatDate } from "@/lib/utils";

interface BookItemProps {
  book: {
    _id: string;
    title: string;
    author: string;
    status: string;
    subject: string;
    description: string;
    link: string;
    createdAt: string;
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
      className="rounded-none flex items-center justify-between p-4 hover:shadow-md transition cursor-pointer first:mt-0 first:rounded-t-lg last:rounded-b-lg"
    >
      <div className="flex flex-col gap-y-2">
        <h2 className="font-semibold">
          {book.title} <span> ({book.author})</span>
        </h2>
        <p className="text-sm text-muted-foreground">{book.description}</p>
        <p className="text-sm text-muted-foreground">
          {formatDate(book.createdAt)}
        </p>
        <div className="inline-flex gap-2">
          <Button
            variant="outline"
            onClick={() => onStatusChange(book._id, "reading")}
            disabled={book.status === "reading"}
          >
            <BookOpen className="h-4 w-4 text-blue-500" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onStatusChange(book._id, "to-read")}
            disabled={book.status === "to-read"}
          >
            <LibraryBig className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            variant="outline"
            onClick={() => onStatusChange(book._id, "done")}
            disabled={book.status === "done"}
          >
            <BookmarkCheck className="h-4 w-4 text-green-500" />
          </Button>
        </div>
      </div>

      <div className="flex">
        <div className="flex gap-2">
          <EditBookModal
            bookAuthor={book.author}
            bookDescription={book.description}
            bookId={book._id}
            bookLink={book.link}
            bookStatus={book.status}
            bookSubject={book.subject}
            bookTitle={book.title}
          />
          <DeleteBookModal onConfirm={confirmDelete} />
        </div>
      </div>
    </Card>
  );
};

export default BookItem;
