
import Navbar from './navbar';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Navbar />
    <div className=" min-h-screen bg-white text-gray-900 dark:text-gray-100">
      {children}
    </div>
    </>
  );
}

