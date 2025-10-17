"use client";
import { createContext, useContext, useState } from "react";

const ViewContext = createContext();

export function ViewProvider({ children }) {
  const [currentView, setCurrentView] = useState("resume");

  return (
    <ViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </ViewContext.Provider>
  );
}

// Custom hook for easy access
export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}