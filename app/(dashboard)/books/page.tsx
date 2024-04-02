"use client";

import { useEffect, useState } from "react";

import { AddBook } from "./_components/add-book";
import BookItem from "./_components/book-item";
import SearchInput from "../_components/search";

import { Spinner } from "@/components/spinner-loading";

import toast from "react-hot-toast";
import { Book, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pagination } from "../_components/pagination";

interface Book {
  id: string;
  author: string;
  subject: string;
  title: string;
  description: string;
  link: string;
  status: string;
  createdAt: string;
  _id: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [statusSearchPerformed, setStatusSearchPerformed] = useState(false);

  const bookFetch = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
      setFilteredBooks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching books");
      console.log(error);
    }
  };

  useEffect(() => {
    bookFetch();
  }, [currentPage]);

  const handleSearchChange = (searchValue: string) => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBooks(filtered);
    setStatusSearchPerformed(false);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string | null) => {
    setSelectedStatus(status);
    setStatusSearchPerformed(true);
    let filtered;
    if (status === "all" || status === null) {
      filtered = books;
    } else {
      filtered = books.filter((book) => book.status === status);
    }
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredBooks
    ? filteredBooks.slice(firstItemIndex, lastItemIndex)
    : [];

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === id ? { ...book, status: newStatus } : book
          )
        );

        setFilteredBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === id ? { ...book, status: newStatus } : book
          )
        );
      } else {
        console.log("Error changing status");
        toast.error("Error changing status");
      }
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  return (
    <div className="h-full container pb-8">
      <div className="mb-8 space-y-4 flex flex-col md:flex-row xl:flex-row justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl md:text-4xl font-bold">Your reading list</h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg ">
            Here you can add and find all your books.
          </p>
        </div>

        <AddBook />
      </div>

      {currentItems.length < 1 && !isLoading ? (
        statusSearchPerformed ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <File className="w-10 h-10 text-primary-500" />
            </div>
            <h2 className="text-xl mt-6 font-semibold">
              No courses found with that status
            </h2>
            <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
              You can return to the full list by clicking the button below.
            </p>
            <Button variant="success" onClick={() => handleStatusFilter("all")}>
              Return to full list
            </Button>
          </div>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <File className="w-10 h-10 text-primary-500" />
            </div>
            <h2 className="text-xl mt-6 font-semibold">
              You don&apos;t have added any courses yet
            </h2>
            <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
              You can add a new course by clicking the button below.
            </p>
            <Button variant="success">
              <Link href="/books/add">Add a new course</Link>
            </Button>
          </div>
        )
      ) : (
        <>
          <div className="flex flex-col justify-center items-center sm:flex-row flex-wrap sm:justify-between gap-2 mt-4">
            <SearchInput onSearchChange={handleSearchChange} />

            <div className="flex gap-x-2 pt-4 sm:pt-0 mx-auto md:mx-0">
              <Button
                onClick={() => handleStatusFilter("all")}
                variant="outline"
              >
                Show All
              </Button>
              <Button
                onClick={() => handleStatusFilter("reading")}
                variant="secondary"
              >
                Reading
              </Button>
              <Button
                onClick={() => handleStatusFilter("to-read")}
                variant="destructive"
              >
                To Read
              </Button>
              <Button
                onClick={() => handleStatusFilter("done")}
                variant="success"
              >
                Done
              </Button>
            </div>

            {filteredBooks && itemsPerPage < filteredBooks.length && (
              <Pagination
                totalItems={filteredBooks.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>

          <div className="w-full mt-4">
            <div className="col-span-1 space-y-2">
              {currentItems.map((book) => (
                <BookItem
                  key={book._id}
                  book={book}
                  _id={book._id}
                  onStatusChange={handleStatusChange}
                />
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

export default Books;
