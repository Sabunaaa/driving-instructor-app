import Navbar from '@/components/layout/Navbar';
import Error404 from '@/components/ui/404Error';
import Copyright from '@/components/ui/Copyright';

export default function Home() {
  return (
    <div className="h-screen bg-[#F5F7FA] flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <Error404 />
      </div>
      <Copyright />
    </div>
  );
}
