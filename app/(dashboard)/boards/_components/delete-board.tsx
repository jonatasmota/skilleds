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
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteBoardModalProps {
  onConfirm: () => void;
}

const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleDeleteCancel = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive" onClick={handleDeleteClick}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete board</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this board?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter>
          <>
            <Button variant="outline" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm}>Confirm Delete</Button>
          </>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoardModal;
