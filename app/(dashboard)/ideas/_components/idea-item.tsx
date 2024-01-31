import React from "react";

import { Card } from "@/components/ui/card";

import toast from "react-hot-toast";

import { EditIdeaModal } from "./edit-idea";
import DeleteIdeaModal from "./delete-idea";
import { formatDate } from "@/lib/utils";

interface IdeaItemProps {
  idea: {
    id: string;
    subject: string;
    title: string;
    textarea: string;
    imgUrl: string;
    createdAt: string;
  };
  _id: string;
}

const IdeaItem: React.FC<IdeaItemProps> = ({ idea, _id }) => {
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
      key={idea.id}
      className="rounded-none flex items-center justify-between p-4 hover:shadow-md transition cursor-pointer first:mt-0 first:rounded-t-lg last:rounded-b-lg"
    >
      <div className="flex flex-col gap-y-2">
        <h2 className="font-semibold">{idea.title}</h2>
        <p className="text-sm text-muted-foreground">
          {idea.textarea
            ? idea.textarea.split("\n").slice(0, 2).join("\n")
            : ""}
        </p>
        <p>{formatDate(idea.createdAt)}</p>
      </div>

      <div className="flex gap-x-4">
        <div className="flex gap-2">
          <EditIdeaModal
            ideaTitle={idea.title}
            ideaId={idea.id}
            ideaTextarea={idea.textarea}
            ideaSubject={idea.subject}
            ideaImgUrl={idea.imgUrl}
          />
          <DeleteIdeaModal onConfirm={confirmDelete} />
        </div>
      </div>
    </Card>
  );
};

export default IdeaItem;
