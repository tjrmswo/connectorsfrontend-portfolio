import { BottomTabNav } from "@/widgets/bottomTab";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-[28rem] flex-col items-center">
      {children}
      <BottomTabNav />
    </div>
  );
}
