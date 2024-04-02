import { SetStateAction, useState } from "react";

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

import { PlusCircle } from "lucide-react";

import toast from "react-hot-toast";

export const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const addBook = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          author: author,
          description: description,
          link: link,
          subject: subject,
          status: status,
        }),
      });

      if (res.ok) {
        console.log("Book added");
        toast.success("Book added");
        setTitle("");
        setAuthor("");
        setSubject("");
        setDescription("");
        setLink("");
        setStatus("");
        window.location.reload();
      } else {
        toast.error("Error adding book");
        console.log("Error adding book");
      }
    } catch (error) {
      toast.error("Error adding book");
      console.log("Error adding book", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <PlusCircle className="mr-2" />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={addBook}>
          <DialogHeader className="pb-4">
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription>Add a new book to your list</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="title" className="opacity-60">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Clean Code"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="author" className="opacity-60">
                Author
              </Label>
              <Input
                id="author"
                placeholder="John Doe"
                className="col-span-3"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="description" className="opacity-60">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Applying clean code principles to real world projects"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="link" className="opacity-60">
                Link
              </Label>
              <Input
                id="link"
                placeholder="Book url"
                className="col-span-3"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="status" className="opacity-60">
                  Status
                </Label>
                <Select
                  value={status}
                  onValueChange={(value: SetStateAction<string>) =>
                    setStatus(value)
                  }
                >
                  <SelectTrigger id="Status">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="to-read">To Read</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 items-center gap-4">
                <Label htmlFor="link" className="opacity-60">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  className="col-span-3"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
