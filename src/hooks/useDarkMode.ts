import { useEffect, useState } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "1"
  );

  // add transition classes to body now instead of on mount
  // to avoid flickering
  useEffect(() => {
    document.body.classList.add(
      "transition-colors",
      "duration-200",
      "ease-in-out"
    );
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", darkMode ? "0" : "1");
    setDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode };
}
