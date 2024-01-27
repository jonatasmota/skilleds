"use client";

import { useEffect, useState } from "react";

import { AddBook } from "./_components/add-book";
import BookItem from "./_components/book-item";

import SearchInput from "../_components/search";
import { Pagination } from "../_components/pagination";

import { Spinner } from "@/components/spinner-loading";

import toast from "react-hot-toast";

interface Book {
  id: string;
  author: string;
  subject: string;
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

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
    <div className="h-full container p-4">
      <div className="mt-20 justify-center gap-4 md:mt-0 flex flex-1 md:justify-between">
        <AddBook />
        <SearchInput onSearchChange={handleSearchChange} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <>
          {getStatuses().map((status) => (
            <div key={status} className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                {getStatusDisplayName(status)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems
                  .filter((book) => book.status === status)
                  .map((book) => (
                    <BookItem
                      key={book._id}
                      book={book}
                      _id={book._id}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
              </div>
            </div>
          ))}
        </>
      )}

      {filteredBooks && itemsPerPage < filteredBooks.length && (
        <div className="text-center md:container pt-8">
          <Pagination
            totalItems={filteredBooks.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Books;
