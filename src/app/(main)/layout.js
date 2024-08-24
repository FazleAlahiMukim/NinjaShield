import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <NavBar />
      <div className="flex-grow">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
