import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="flex items-center justify-center py-20">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome to Driving Instructor Platform
        </h1>
      </div>
    </div>
  );
}