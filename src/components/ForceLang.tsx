import { useEffect } from "react";
import { useLang, Lang } from "@/lib/lang";

export function ForceLang({ lang }: { lang: Lang }) {
  const { lang: current, setLang } = useLang();
  useEffect(() => {
    if (current !== lang) setLang(lang);
  }, [current, lang, setLang]);
  return null;
}
