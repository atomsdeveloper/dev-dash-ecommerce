"use client";

// Hooks State
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Hooks Url
import { useSearchParams, useRouter } from "next/navigation";

type PageContextType = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePageState] = useState<string>("dashboard");

  const searchParams = useSearchParams();
  const router = useRouter();

  // Defines the page and also the Url.
  const setActivePage = (page: string) => {
    setActivePageState(page);
    router.replace(`/dashboard?view=${page}`, { scroll: false });
  };

  // If the user changes thu Url manually.
  useEffect(() => {
    const page = searchParams.get("view");
    if (page && page !== activePage) {
      setActivePageState(page);
    }
  }, [searchParams, activePage]);

  return (
    <PageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider");
  }
  return context;
}
