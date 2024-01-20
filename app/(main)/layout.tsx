import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className="h-screen md:mt-40">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
