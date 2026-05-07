import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Lang = "es" | "en";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (es: string, en: string) => string;
};

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children, initial }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(initial ?? "es");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("wlx_lang") as Lang | null;
    if (saved && saved !== lang) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("wlx_lang", l);
  };

  const t = (es: string, en: string) => (lang === "en" ? en : es);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
