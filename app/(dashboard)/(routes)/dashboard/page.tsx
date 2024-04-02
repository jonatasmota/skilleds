"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Book,
  CircleUser,
  Lightbulb,
  NotebookText,
  Package2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDateFormat } from "@/hooks/use-date-format";
import { Spinner } from "@/components/spinner-loading";
import { Separator } from "@/components/ui/separator";

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

interface Course {
  id: string;
  author: string;
  subject: string;
  title: string;
  description: string;
  link: string;
  status: string;
  _id: string;
}

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [bookCount, setBookCount] = useState(0);
  const [courseCount, setCoursesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { formatDate } = useDateFormat();

  const fetchBooks = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/books");
      let data = await res.json();

      const dataFiltered = data.filter((book: any) => book.status === "done");

      data = data.sort((a: any, b: any) => {
        const dateA =
          typeof a.createdAt === "string" ? new Date(a.createdAt) : a.createdAt;
        const dateB =
          typeof b.createdAt === "string" ? new Date(b.createdAt) : b.createdAt;
        return dateB.getTime() - dateA.getTime();
      });

      setBookCount(data.length);
      setBooks(data);
      setFilteredBooks(dataFiltered);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching book count");
      console.log(error);
    }
  };

  const fetchCourses = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/courses");
      const data = await res.json();

      const dataFiltered = data.filter(
        (course: any) => course.status === "done"
      );

      setCoursesCount(data.length);

      setFilteredCourses(dataFiltered);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching course count");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCourses();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? <Spinner /> : bookCount}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <NotebookText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? <Spinner /> : courseCount}
              </div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ideas</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Your Recent Books</CardTitle>
                <CardDescription>
                  A list of your most recent books added
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/books">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <div className="font-medium">{book.title}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {book.author}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        Sale
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground md:inline">
                        <Badge
                          className="text-xs flex justify-center items-center"
                          variant="outline"
                        >
                          {book.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        2023-06-23
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(book.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Read Books</CardTitle>
            </CardHeader>

            {filteredBooks
              .filter((book) => book.status === "done")
              .map((book) => (
                <CardContent key={book.id} className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {book.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {book.author}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge className="capitalize">{book.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              ))}

            <Separator />

            <CardHeader>
              <CardTitle>Recent Courses Completed</CardTitle>
            </CardHeader>

            {filteredCourses
              .filter((course) => course.status === "done")
              .map((course) => (
                <CardContent key={course.id} className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {course.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {course.subject}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge className="capitalize">{course.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              ))}
          </Card>
        </div>
      </main>
    </div>
  );
}
