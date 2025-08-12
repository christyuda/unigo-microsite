import { useLocation } from "react-router-dom";

const authPages = ["/login", "/onboarding", "/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useLocation();

  if (authPages.includes(params.pathname)) {
    return (
      <div className="flex min-h-full w-full items-start justify-center bg-background p-4 text-primary">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-start justify-center">
      {children}
    </div>
  );
}
