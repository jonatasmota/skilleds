import { CardItem } from "@/components/card-item";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
      <CardItem
        title={"Books"}
        description={"lorem ipsum dolums"}
        url="/books"
      />
      <CardItem
        title={"Courses"}
        description={"lorem ipsum dolums"}
        url="/courses"
      />
      <CardItem
        title={"Ideas"}
        description={"lorem ipsum dolums"}
        url="/ideas"
      />
    </div>
  );
};

export default Hero;
