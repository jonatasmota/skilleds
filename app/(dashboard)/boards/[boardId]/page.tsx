"use client";

import { useEffect, useState } from "react";
import { AddSection } from "./_components/add-section";

interface BoardProps {
  title: string;
  description: string;
  position: number;
  _id: string;
}

const Board = ({ _id, description, position, title }: BoardProps) => {
  const [newTitle, setNewTitle] = useState(title || "");
  const [newPosition, setNewPosition] = useState(position || 0);
  const [newDescription, setNewDescription] = useState(description || "");

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const res = await fetch(`/api/boards?id=${_id}}`);
        if (res.ok) {
          const boardData = await res.json();
          if (boardData[0]) {
            setNewTitle(boardData[0].title);
            setNewPosition(boardData[0].position);
            setNewDescription(boardData[0].description);
          }
          console.log(boardData);
        } else {
          console.log("Error fetching board data");
        }
      } catch (error) {
        console.error("Error fetching board data", error);
      }
    };

    fetchBoardData();
  }, []);

  return (
    <div>
      <AddSection boardId={_id} />
      <h1>{newTitle}</h1>
    </div>
  );
};

export default Board;
