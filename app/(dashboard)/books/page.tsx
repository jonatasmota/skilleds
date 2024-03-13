"use client";

import { useEffect, useState } from "react";

import { AddBook } from "./_components/add-book";
import BookItem from "./_components/book-item";
import SearchInput from "../_components/search";

import { Spinner } from "@/components/spinner-loading";

import toast from "react-hot-toast";
import {
  AlertTriangle,
  Book,
  BookOpen,
  BookmarkCheck,
  File,
  LibraryBig,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

const initialItemsToShow = 3;

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [itemsToShow, setItemsToShow] = useState({
    reading: initialItemsToShow,
    "to-read": initialItemsToShow,
    done: initialItemsToShow,
  });

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    const filtered = books.filter((book) => book.status === status);
    setFilteredBooks(filtered);
  };

  const handleShowAll = () => {
    setSelectedStatus(null);
    setFilteredBooks(books);
  };

  const showMoreItems = (status) => {
    setItemsToShow((prevState) => ({
      ...prevState,
      [status]: prevState[status] + initialItemsToShow,
    }));
  };

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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      console.log("Changing status...", id, newStatus);

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

  useEffect(() => {
    bookFetch();
  }, [currentPage]);

  const handleSearchChange = (searchValue: string) => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredBooks
    ? filteredBooks.slice(firstItemIndex, lastItemIndex)
    : [];

  const getStatusDisplayName = (status: string): string => {
    switch (status) {
      case "to-read":
        return "To Read";
      case "reading":
        return "Reading";
      case "done":
        return "Done";
      default:
        return status;
    }
  };

  const getStatuses = () =>
    Array.from(new Set(filteredBooks.map((book) => book.status)));

  return (
    <div className="h-full container pb-8">
      <div className="mb-8 space-y-4 flex flex-col md:flex-row xl:flex-row justify-between">
        <div className="grid gap-1">
          <h2 className="text-2xl md:text-4xl font-bold">Your reading list</h2>
          <p className="text-muted-foreground font-light text-sm md:text-lg ">
            Here you can add all your books.
          </p>
        </div>

        <AddBook />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}

      {books.length < 1 && !isLoading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="text-xl mt-6 font-semibold">
            You don&apos;t have added any books yet
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
            You can add a new book by clicking the button below.
          </p>

          <AddBook />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-between gap-2 mt-4">
            <SearchInput onSearchChange={handleSearchChange} />

            <div className="flex gap-x-2 pt-4 sm:pt-0 mx-auto md:mx-0">
              <Button onClick={handleShowAll} variant="outline">
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
            <div className="w-full mt-4">
              {getStatuses()
                .sort((a, b) => {
                  const order = ["reading", "to-read", "done"];
                  return order.indexOf(a) - order.indexOf(b);
                })
                .map((status) => {
                  let Icon, color, bgColor;
                  switch (status) {
                    case "reading":
                      Icon = BookOpen;
                      color = "text-blue-500";
                      bgColor = "bg-blue-500/10";

                      break;
                    case "to-read":
                      Icon = LibraryBig;
                      color = "text-red-500";
                      bgColor = "bg-red-500/10";
                      break;
                    case "done":
                      Icon = BookmarkCheck;
                      color = "text-green-500";
                      bgColor = "bg-green-500/10";
                      break;
                    default:
                      Icon = AlertTriangle;
                      color = "text-gray-500";
                      bgColor = "bg-gray-500/10";
                      break;
                  }

                  const booksWithStatus = currentItems
                    .filter((book) => book.status === status)
                    .slice(0, itemsToShow[status]);

                  return (
                    <div key={status} className="w-full mt-4">
                      <h3 className="text-xl font-semibold mb-4">
                        <Icon
                          className={cn(
                            "w-10 h-10 rounded-full p-2 inline-block transform",
                            color,
                            bgColor
                          )}
                        />{" "}
                        {getStatusDisplayName(status)}
                      </h3>
                      <div className="col-span-1 space-y-2">
                        {booksWithStatus.map((book) => (
                          <BookItem
                            key={book._id}
                            book={book}
                            _id={book._id}
                            onStatusChange={handleStatusChange}
                          />
                        ))}
                      </div>
                      {booksWithStatus.length <
                        currentItems.filter((book) => book.status === status)
                          .length && (
                        <button onClick={() => showMoreItems(status)}>
                          Load more
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}

      {filteredBooks.length < 1 && (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary-500" />
          </div>
          <h2 className="text-xl mt-6 font-semibold">
            No books found with that title
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground leading-6">
            Try searching for something else.
          </p>
        </div>
      )}
    </div>
  );
};

export default Books;
