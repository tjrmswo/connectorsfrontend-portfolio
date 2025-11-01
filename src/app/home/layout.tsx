"use client";
import { BottomTabNav } from "@/widgets/bottomTab";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const noLayoutPaths = [
    "/home/profile/career/mycareer",
    "/home/profile/myprofile",
  ];
  const shouldShowLayout = !noLayoutPaths.includes(pathname);

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full w-[28rem] flex-col items-center">
      {children}
      <BottomTabNav />
    </div>
  );
}
