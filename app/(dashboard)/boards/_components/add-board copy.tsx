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
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { unsplash } from "@/lib/unsplash";

export const AddBoard = () => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["562578"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        }
      } catch (error) {
        console.log("Error fetching images", error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const addBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          position: position,
        }),
      });

      if (res.ok) {
        console.log("Board added");
        toast.success("Board added");
        setTitle("");
        setDescription("");
        setPosition("");
        window.location.reload();
      } else {
        toast.error("Error adding board");
        console.log("Error adding board");
      }
    } catch (error) {
      toast.error("Error adding board");
      console.log("Error adding board", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <PlusCircle className="mr-2" />
          Add Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={addBoard}>
          <DialogHeader className="pb-4">
            <DialogTitle>Add Board</DialogTitle>
            <DialogDescription>Add a new board to your list</DialogDescription>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
