import { SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Pencil } from "lucide-react";

import toast from "react-hot-toast";

interface EditBookModalProps {
  bookId: string;
  bookTitle: string;
  bookDescription: string;
  bookAuthor: string;
  bookLink: string;
  bookStatus: string;
  bookSubject: string;
}

export const EditBookModal = ({
  bookAuthor,
  bookDescription,
  bookId,
  bookLink,
  bookStatus,
  bookSubject,
  bookTitle,
}: EditBookModalProps) => {
  const [newTitle, setNewTitle] = useState(bookTitle || "");
  const [newDescription, setNewDescription] = useState(bookDescription || "");
  const [newLink, setNewLink] = useState(bookLink || "");
  const [newStatus, setNewStatus] = useState(bookStatus || "");
  const [newAuthor, setNewAuthor] = useState(bookAuthor || "");
  const [newSubject, setNewSubject] = useState(bookSubject || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await fetch(`/api/books/${bookId}`);
        if (res.ok) {
          const bookData = await res.json();
          setNewTitle(bookData.title);
          setNewDescription(bookData.description);
          setNewLink(bookData.link);
          setNewStatus(bookData.status);
          setNewAuthor(bookData.author);
          setNewSubject(bookData.subject);
        } else {
          console.log("Error fetching book data");
          toast.error("Error fetching book data");
        }
      } catch (error) {
        console.error("Error fetching book data", error);
        toast.error("Error fetching book data");
      }
    };

    if (isOpen && bookId) {
      fetchBookData();
    }
  }, [isOpen, bookId]);

  const editBook = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch(`/api/books/${bookId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newLink,
          newStatus,
          newAuthor,
          newSubject,
        }),
      });

      if (res.ok) {
        console.log("Book updated successfully");
        toast.success("Book updated successfully");
        window.location.reload();
      } else {
        console.log("Error editing book");
        toast.error("Error editing book");
      }
    } catch (error) {
      console.log("Error editing vook", error);
      toast.error("Error editing book");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={editBook}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Edit the book information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Mastering JavaScript"
                className="col-span-3"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                placeholder="Simon Sinek"
                className="col-span-3"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="A complete JavaScript Book with 5 projects"
                className="col-span-3"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input
                id="link"
                placeholder="Book url"
                className="col-span-3"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newStatus}
                  onValueChange={(value: SetStateAction<string>) =>
                    setNewStatus(value)
                  }
                >
                  <SelectTrigger id="Status">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="to-read">To read</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                placeholder="Subject"
                className="col-span-3"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
