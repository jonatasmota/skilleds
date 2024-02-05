import React from "react";

import { Card } from "@/components/ui/card";

import toast from "react-hot-toast";

import { EditBoardModal } from "./edit-board";
import DeleteBoardModal from "./delete-board";
import Link from "next/link";

interface BoardItemProps {
  board: {
    title: string;
    description: string;
    position: number;
    _id: string;
  };
  _id: string;
}

const BoardItem: React.FC<BoardItemProps> = ({ board, _id }) => {
  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/boards?id=${_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Board deleted successfully");
        toast.success("Board deleted successfully");
        window.location.reload();
      } else {
        console.log("Error deleting board");
        toast.error("Error deleting board");
      }
    } catch (error) {
      console.log("Error deleting board", error);
    }
  };

  return (
    <Link href="/boards/board">
      <Card
        key={board._id}
        className="rounded-none flex items-center justify-between p-4 hover:shadow-md transition cursor-pointer first:mt-0 first:rounded-t-lg last:rounded-b-lg"
      >
        <div className="flex flex-col gap-y-2">
          <h2 className="font-semibold">{board.title}</h2>
          <p className="text-sm text-muted-foreground">{board.description}</p>
        </div>

        <div className="flex gap-x-4">
          <div className="flex gap-2">
            <EditBoardModal
              boardTitle={board.title}
              boardDescription={board.description}
              boardId={board._id}
              boardPosition={board.position}
            />

            <DeleteBoardModal onConfirm={confirmDelete} />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BoardItem;
