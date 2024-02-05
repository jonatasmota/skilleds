import React, { useState } from "react";

import { Card } from "@/components/ui/card";

import toast from "react-hot-toast";

import { EditIdeaModal } from "./edit-idea";
import DeleteIdeaModal from "./delete-idea";

import { formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

interface IdeaItemProps {
  idea: {
    _id: string;
    subject: string;
    title: string;
    textarea: string;
    imgUrl: string;
    createdAt: string;
  };
  _id: string;
}

const IdeaItem = ({ idea, _id }: IdeaItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/ideas?id=${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Idea deleted successfully");
        toast.success("Idea deleted successfully");
        window.location.reload();
      } else {
        console.log("Error deleting idea");
        toast.error("Error deleting idea");
      }
    } catch (error) {
      console.log("Error deleting idea", error);
    }
  };

  return (
    <Card
      key={idea._id}
      className="rounded-none flex items-center justify-between p-4 hover:shadow-md transition cursor-pointer first:mt-0 first:rounded-t-lg last:rounded-b-lg"
    >
      <div className="flex flex-col gap-y-2" onClick={() => setIsOpen(true)}>
        <h2 className="font-semibold">{idea.title}</h2>
        <p className="text-sm text-muted-foreground">
          {idea.textarea ? idea.textarea.substring(0, 80) : ""}
        </p>
        <p>{formatDate(idea.createdAt)}</p>
      </div>

      <div className="flex gap-x-4">
        <div className="flex gap-2">
          <EditIdeaModal
            ideaId={idea._id}
            ideaTitle={idea.title}
            ideaTextarea={idea.textarea}
            ideaSubject={idea.subject}
            ideaImgUrl={idea.imgUrl}
          />
          <DeleteIdeaModal onConfirm={confirmDelete} />
        </div>
      </div>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{idea.title}</DialogTitle>
              <DialogDescription>
                {formatDate(idea.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div>
              <p>{idea.textarea}</p>
            </div>
            <div>
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <Image
                  src={idea.imgUrl}
                  fill
                  className="object-cover"
                  alt={idea.title}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default IdeaItem;
