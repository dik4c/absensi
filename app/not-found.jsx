import Link from "next/link";

const NotFound = () => {
  return (
    <div className="text-center py-[200px]">
      <h2 className="text-headline">404</h2>
      <p className="pb-[20px]">Could not find requested resource</p>
      <Link href="/" className="btn">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
