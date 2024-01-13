import Link from "next/link";

const Logo = () => {
  return (
    <div className="p-6">
      <Link href="/">
        <h1 className="text-indigo-600 text-2xl font-bold">skilleds</h1>
      </Link>
    </div>
  );
};

export default Logo;
