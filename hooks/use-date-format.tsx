import { format } from "date-fns";

export const useDateFormat = () => {
  const formatDate = (
    dateString: string,
    formatString: string = "MMMM d, yyy"
  ) => {
    const date = new Date(dateString);
    return format(date, formatString);
  };

  return { formatDate };
};
