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

interface EditCourseModalProps {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseLink: string;
  courseStatus: string;
}

export const EditCourseModal = ({
  courseDescription,
  courseId,
  courseLink,
  courseStatus,
  courseTitle,
}: EditCourseModalProps) => {
  const [newTitle, setNewTitle] = useState(courseTitle || "");
  const [newDescription, setNewDescription] = useState(courseDescription || "");
  const [newLink, setNewLink] = useState(courseLink || "");
  const [newStatus, setNewStatus] = useState(courseStatus || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (res.ok) {
          const courseData = await res.json();
          setNewTitle(courseData.title);
          setNewDescription(courseData.description);
          setNewLink(courseData.link);
          setNewStatus(courseData.status);
        } else {
          console.log("Error fetching course data");
        }
      } catch (error) {
        console.error("Error fetching course data", error);
      }
    };

    if (isOpen && courseId) {
      fetchCourseData();
    }
  }, [isOpen, courseId]);

  const editCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
          newLink,
          newStatus,
        }),
      });

      if (res.ok) {
        console.log("Course updated successfully");
        toast.success("Course updated successfully");
        window.location.reload();
      } else {
        console.log("Error editing course");
        toast.error("Error editing course");
      }
    } catch (error) {
      console.log("Error editing course", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={editCourse}>
          <DialogHeader className="pb-4">
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Edit the course information</DialogDescription>
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
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
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
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
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
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <div className="flex flex-col space-y-2.5">
                <Label htmlFor="status" className="opacity-60">
                  Status
                </Label>
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
                    <SelectItem value="doing">Doing</SelectItem>
                    <SelectItem value="willdo">Will Do</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
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
