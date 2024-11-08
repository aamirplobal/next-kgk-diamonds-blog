import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "CMS with WYSIWYG",
  description:
    "Develop a content management system (CMS) using Next.js. This CMS should allow users to create, edit, and delete posts and pages through a user-friendly interface. The CMS should also feature an intuitive, WYSIWYG (What You See Is What You Get) editor that enables users to format content visually, with features similar to modern website builders. Furthermore, a plugin architecture should be integrated to facilitate extensibility, allowing users to enhance functionality over time by adding custom components or features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>October 2024</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div>{children}</div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
