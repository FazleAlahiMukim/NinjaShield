import LoginCard from "@/components/LoginCard";
import LogoAndName from "@/components/LogoAndName";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-slate-100">
      <div className="absolute left-40 top-52">
        <LogoAndName size="large" />
        <h1 className="text-3xl">Secure Your Data, Protect Your Future:</h1>
        <h1 className="text-3xl">Discover the Ultimate DLP Solution Today!</h1>
      </div>
      <LoginCard className="absolute right-40" />
    </div>
  );
}
