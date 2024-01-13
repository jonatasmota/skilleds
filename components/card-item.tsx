import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardItemProps {
  title: string;
  description: string;
  url: string;
}

export const CardItem = ({ title, description, url }: CardItemProps) => {
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Link href={url}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
