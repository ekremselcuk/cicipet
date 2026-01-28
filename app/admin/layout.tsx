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
            {children}
        </AdminMenuProvider>
    );
}
