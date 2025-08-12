export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen w-full max-w-md flex-col items-start justify-start px-3">
      {children}
    </div>
  );
}
