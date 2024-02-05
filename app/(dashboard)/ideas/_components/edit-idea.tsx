import { useEffect, useState } from "react";

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

import { Pencil } from "lucide-react";

import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

interface EditIdeaModalProps {
  ideaId: string;
  ideaTitle: string;
  ideaSubject: string;
  ideaImgUrl: string;
  ideaTextarea: string;
}

export const EditIdeaModal = ({
  ideaId,
  ideaImgUrl,
  ideaSubject,
  ideaTextarea,
  ideaTitle,
}: EditIdeaModalProps) => {
  const [newTitle, setNewTitle] = useState(ideaTitle || "");
  const [newTextarea, setNewTextarea] = useState(ideaTextarea || "");
  const [newImgUrl, setNewImgUrl] = useState(ideaImgUrl || "");
  const [newSubject, setNewSubject] = useState(ideaSubject || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchIdeaData = async () => {
      try {
        const res = await fetch(`/api/ideas/${ideaId}`);
        if (res.ok) {
          const ideaData = await res.json();
          setNewTitle(ideaData.title);
          setNewTextarea(ideaData.textarea);
          setNewImgUrl(ideaData.imgUrl);
          setNewSubject(ideaData.subject);
        } else {
          console.log("Error fetching idea data");
          toast.error("Error fetching idea data");
        }
      } catch (error) {
        console.error("Error fetching idea data", error);
        toast.error("Error fetching idea data");
      }
    };

    if (isOpen && ideaId) {
      fetchIdeaData();
    }
  }, [isOpen, ideaId]);

  const editIdea = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch(`/api/ideas/${ideaId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newTextarea,
          newImgUrl,
          newSubject,
        }),
      });

      if (res.ok) {
        console.log("Idea updated successfully");
        toast.success("Idea updated successfully");
        window.location.reload();
      } else {
        console.log("Error editing idea");
        toast.error("Error editing idea");
      }
    } catch (error) {
      console.log("Error editing idea", error);
      toast.error("Error editing idea");
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
        <form onSubmit={editIdea}>
          <DialogHeader>
            <DialogTitle>Edit Idea</DialogTitle>
            <DialogDescription>Edit the idea information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                defaultValue={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="textarea" className="text-right">
                Textarea
              </Label>
              <Textarea
                id="textarea"
                className="col-span-3"
                rows={12}
                value={newTextarea}
                onChange={(e) => setNewTextarea(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                ImgUrl
              </Label>
              <Input
                id="imgUrl"
                className="col-span-3"
                defaultValue={newImgUrl}
                onChange={(e) => setNewImgUrl(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                className="col-span-3"
                defaultValue={newSubject}
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
