"use client";

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
import { useState } from "react";

import toast from "react-hot-toast";

export const AddSection = ({ boardId }: { boardId: string }) => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");

  const addSection = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          order: order,
          board: boardId,
        }),
      });

      if (res.ok) {
        console.log("Section added");
        toast.success("Section added");
        setTitle("");
        setOrder("");
        window.location.reload();
      } else {
        toast.error("Error adding section");
        console.log("Error adding section");
      }
    } catch (error) {
      toast.error("Error adding section");
      console.log("Error adding section", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <PlusCircle className="mr-2" />
          Add Section
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={addSection}>
          <DialogHeader className="pb-4">
            <DialogTitle>Add Section</DialogTitle>
            <DialogDescription>
              Add a new section to your board
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="title" className="opacity-60">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Projeto 1"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="order" className="opacity-60">
                Order
              </Label>
              <Input
                id="order"
                type="number"
                className="col-span-3"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                required
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
