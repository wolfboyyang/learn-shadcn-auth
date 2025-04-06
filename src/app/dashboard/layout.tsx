import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {/* page main content */}
        <div className="stack-scope flex w-full h-full max-w-full relative">
          <div className="flex-1 w-0 flex justify-center gap-4 py-2 px-4">
            <div className="flex flex-col max-w-[800px] w-[800px]">
              {children}
            </div>
          </div>
        </div>
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
