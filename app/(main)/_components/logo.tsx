import Link from "next/link";

const Logo = () => {
  return (
    <div className="p-6">
      <Link href="/">
        <h1 className="bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-orange-400 via-sky-700 to-indigo-900 text-transparent bg-clip-text text-3xl font-bold">
          skilleds
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
