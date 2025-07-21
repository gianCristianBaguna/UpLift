
import Navbar from './navbar';

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Navbar />
      <main className="absolute top-1 left-0 right-0 bottom-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
