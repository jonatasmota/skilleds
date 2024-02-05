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

interface EditBoardModalProps {
  boardId: string;
  boardTitle: string;
  boardDescription: string;
  boardPosition: number;
}

export const EditBoardModal = ({
  boardDescription,
  boardId,
  boardPosition,
  boardTitle,
}: EditBoardModalProps) => {
  const [newTitle, setNewTitle] = useState(boardTitle || "");
  const [newDescription, setNewDescription] = useState(boardDescription || "");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const res = await fetch(`/api/boards/${boardId}`);
        if (res.ok) {
          const boardData = await res.json();
          setNewTitle(boardData.title);
          setNewDescription(boardData.description);
        } else {
          console.log("Error fetching board data");
        }
      } catch (error) {
        console.error("Error fetching board data", error);
      }
    };

    if (isOpen && boardId) {
      fetchBoardData();
    }
  }, [isOpen, boardId]);

  const editBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch(`/api/boards/${boardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle,
          newDescription,
        }),
      });

      if (res.ok) {
        console.log("Board updated successfully");
        toast.success("Board updated successfully");
        window.location.reload();
      } else {
        console.log("Error editing board");
        toast.error("Error editing board");
      }
    } catch (error) {
      console.log("Error editing board", error);
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
        <form onSubmit={editBoard}>
          <DialogHeader>
            <DialogTitle>Edit Board</DialogTitle>
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
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-3"
                defaultValue={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
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
