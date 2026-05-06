import { useTranslations } from "next-intl";

export function useSpecialty() {
  const ts = useTranslations("specialties");

  return (name: string): string => {
    try {
      const result = ts(name);
      return result;
    } catch {
      return name;
    }
  };
}
