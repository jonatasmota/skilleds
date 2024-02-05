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

interface ViewIdeaModalProps {
  ideaTitle: string;
  ideaId: string;
  ideaSubject: string;
  ideaImgUrl: string;
  ideaTextarea: string;
  ideaCreatedAt: string;
}

export const ViewIdeaModal = ({
  ideaId,
  ideaImgUrl,
  ideaSubject,
  ideaTextarea,
  ideaTitle,
  ideaCreatedAt,
}: ViewIdeaModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchIdeaData = async () => {
      try {
        const res = await fetch(`/api/ideas/${ideaId}`);
        if (res.ok) {
          const ideaData = await res.json();
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form>
          <DialogHeader>
            <DialogTitle>{ideaTitle}</DialogTitle>
            <DialogDescription>{ideaCreatedAt}</DialogDescription>
          </DialogHeader>
          <DialogContent>
            <p>{ideaTextarea}</p>
          </DialogContent>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
