import { useState } from "react";

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

import { PlusCircle } from "lucide-react";

import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

export const AddIdea = () => {
  const [title, setTitle] = useState("");
  const [textarea, setTextarea] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [subject, setSubject] = useState("");

  const addIdea = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          subject: subject,
          imgUrl: imgUrl,
          textarea: textarea,
        }),
      });

      if (res.ok) {
        console.log("Idea added");
        toast.success("Idea added");
        setTitle("");
        setTextarea("");
        setSubject("");
        setImgUrl("");

        window.location.reload();
      } else {
        toast.error("Error adding idea");
        console.log("Error adding idea");
      }
    } catch (error) {
      toast.error("Error adding idea");
      console.log("Error adding idea", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <PlusCircle className="mr-2" />
          Add Idea
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={addIdea}>
          <DialogHeader className="pb-4">
            <DialogTitle>Add Idea</DialogTitle>
            <DialogDescription>Add a new idea to your list</DialogDescription>
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
                required
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="description" className="opacity-60">
                Idea
              </Label>
              <Textarea
                id="textarea"
                placeholder="Write your idea here"
                className="col-span-3"
                rows={12}
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="author" className="opacity-60">
                ImgUrl
              </Label>
              <Input
                id="imgUrl"
                placeholder="John Doe"
                className="col-span-3"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
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
                  required
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
