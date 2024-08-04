import { LoginView } from "@/sections/auth";


export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 px-2 sm:px-6 lg-px-8">
      {/* AUTHFORM */}
      <LoginView />
    </div>
  );
}
