"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import BoardItem from "./_components/board-item";

import { AddBoard } from "./_components/add-board";

import { Spinner } from "@/components/spinner-loading";
import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { File } from "lucide-react";

interface Board {
  id: string;
  title: string;
  description: string;
  position: number;
  _id: string;
}

const Boards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const boardFetch = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/boards");
      const data = await res.json();
      setBoards(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching boards");
      console.log(error);
    }
  };

  useEffect(() => {
    boardFetch();
  }, []);

  return (
    <div className="h-full container">
      <div className="mb-8 space-y-4 flex flex-col md:flex-row xl:flex-row justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl md:text-4xl font-bold">Your tasks</h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg">
            Here you can add and find all your boards and tasks.
          </p>
        </div>

        <AddBoard />
      </div>

      {boards.length < 1 && !isLoading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="text-xl mt-6 font-semibold">
            You don&apos;t have added any board yet
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
            You can add a new board by clicking the button below.
          </p>
          <Button variant="success">
            <Link href="/boards/add">Add a new board</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <div>
              {boards.map((board) => (
                <BoardItem key={board._id} board={board} _id={board._id} />
              ))}
            </div>
          </div>
        </>
      )}

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Boards;
