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
import { SetStateAction, useState } from "react";

import toast from "react-hot-toast";

export const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");

  const addCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          link: link,
          status: status,
        }),
      });

      if (res.ok) {
        console.log("Course added");
        toast.success("Course added");
        setTitle("");
        setDescription("");
        setLink("");
        setStatus("");
        window.location.reload();
      } else {
        toast.error("Error adding course");
        console.log("Error adding course");
      }
    } catch (error) {
      toast.error("Error adding course");
      console.log("Error adding course", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <PlusCircle className="mr-2" />
          Add Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={addCourse}>
          <DialogHeader className="pb-4">
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>Add a new course to your list</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="title" className="opacity-60">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Mastering JavaScript"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="description" className="opacity-60">
                Description
              </Label>
              <Input
                id="description"
                placeholder="A complete JavaScript course with 5 projects"
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
                id="username"
                placeholder="Course url"
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
                    <SelectItem value="doing">Doing</SelectItem>
                    <SelectItem value="willdo">Will Do</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="wanttodo">Want to do</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
