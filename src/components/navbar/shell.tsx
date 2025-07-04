// src/components/Shell.tsx
import Navbar from './navbar';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="flex-1 overflow-auto bg-black text-white ">{children}</main>
    </div>
  );
}
