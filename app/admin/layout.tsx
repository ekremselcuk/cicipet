import { AdminMenuProvider } from "@/context/AdminMenuContext";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminMenuProvider>
            <AdminSidebar />
            <div className="md:pl-72 transition-all duration-300">
                {children}
            </div>
        </AdminMenuProvider>
    );
}
