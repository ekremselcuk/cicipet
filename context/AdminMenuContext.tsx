'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AdminMenuContextType = {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
};

const AdminMenuContext = createContext<AdminMenuContextType | undefined>(undefined);

export function AdminMenuProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <AdminMenuContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
            {children}
        </AdminMenuContext.Provider>
    );
}

export function useAdminMenu() {
    const context = useContext(AdminMenuContext);
    if (context === undefined) {
        throw new Error('useAdminMenu must be used within an AdminMenuProvider');
    }
    return context;
}
