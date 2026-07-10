"use client";

import { createContext, useContext, useState } from "react";

interface SidebarContextValue {
  open: boolean;
  setOpen: (value: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

/**
 * Provee el estado abierto/cerrado del menú lateral. En desktop el sidebar es
 * siempre visible; en mobile se abre/cierra como drawer desde el botón del
 * TopBar. Envuelve el layout de cada portal para compartir el estado entre el
 * Sidebar y el TopBar.
 */
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider
      value={{ open, setOpen, toggle: () => setOpen(!open) }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
