import { useTranslations } from "next-intl";

export function usePackageItem() {
  const t = useTranslations("packageItems");
  return (name: string): string => {
    try { return t(name); }
    catch { return name; }
  };
}

export function useDuration() {
  const t = useTranslations("durations");
  return (name: string): string => {
    try { return t(name); }
    catch { return name; }
  };
}
