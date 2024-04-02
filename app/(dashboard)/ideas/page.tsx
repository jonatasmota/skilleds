"use client";

import { useEffect, useState } from "react";

import { AddIdea } from "./_components/add-idea";
import IdeaItem from "./_components/idea-item";

import SearchInput from "../_components/search";
import { Pagination } from "../_components/pagination";

import { Spinner } from "@/components/spinner-loading";

import toast from "react-hot-toast";
import { File } from "lucide-react";

interface Idea {
  id: string;
  subject: string;
  title: string;
  textarea: string;
  imgUrl: string;
  _id: string;
  createdAt: string;
}

const Ideas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([]);

  const ideaFetch = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/ideas");
      const data = await res.json();
      setIdeas(data);
      setFilteredIdeas(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching ideas");
      console.log(error);
    }
  };

  useEffect(() => {
    ideaFetch();
  }, [currentPage]);

  const handleSearchChange = (searchValue: string) => {
    const filtered = ideas.filter((idea) =>
      idea.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredIdeas(filtered);
    setCurrentPage(1);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredIdeas
    ? filteredIdeas.slice(firstItemIndex, lastItemIndex)
    : [];

  return (
    <div className="h-full container pb-4">
      <div className="mb-8 space-y-4 flex flex-col md:flex-row xl:flex-row justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl md:text-4xl font-bold">Your ideas</h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg">
            Here you can add and find all your ideas.
          </p>
        </div>

        <AddIdea />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}

      {currentItems.length < 1 && !isLoading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="text-xl mt-6 font-semibold">
            You don&apos;t have added any idea yet
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
            You can add a new idea by clicking the button below.
          </p>
          <AddIdea />
        </div>
      ) : (
        <>
          <div className="mt-8 justify-center gap-4 md:mt-0 flex flex-1 md:justify-between">
            <SearchInput onSearchChange={handleSearchChange} />
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {currentItems.map((idea) => (
                <IdeaItem key={idea._id} idea={idea} _id={idea._id} />
              ))}
            </div>
          </div>
        </>
      )}

      {filteredIdeas && itemsPerPage < filteredIdeas.length && (
        <div className="text-center md:container pt-8">
          <Pagination
            totalItems={filteredIdeas.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Ideas;
