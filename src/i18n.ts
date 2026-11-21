import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./locales/es.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import pt_BR from "./locales/pt-BR.json";
import de from "./locales/de.json";
import hi from "./locales/hi.json";
import id from "./locales/id.json";
import ru from "./locales/ru.json";

export const IDIOMAS: [string, string][] = [
  ["es", "Español"], ["en", "English"], ["fr", "Français"], ["pt-BR", "Português"],
  ["de", "Deutsch"], ["hi", "हिन्दी"], ["id", "Bahasa Indonesia"], ["ru", "Русский"],
];

const SOPORTADOS = IDIOMAS.map(([c]) => c);

function detectar(): string {
  try {
    const guardado = localStorage.getItem("idioma");
    if (guardado && SOPORTADOS.includes(guardado)) return guardado;
  } catch { /* sin almacenamiento */ }
  const nav = (navigator.language || "es").toLowerCase();
  if (nav.startsWith("pt")) return "pt-BR";
  const base = nav.split("-")[0];
  return SOPORTADOS.includes(base) ? base : "es";
}

export function cambiarIdioma(codigo: string) {
  try { localStorage.setItem("idioma", codigo); } catch { /* sin almacenamiento */ }
  i18n.changeLanguage(codigo);
}

i18n.use(initReactI18next).init({
  resources: {
    "es": { tools: es },
    "en": { tools: en },
    "fr": { tools: fr },
    "pt-BR": { tools: pt_BR },
    "de": { tools: de },
    "hi": { tools: hi },
    "id": { tools: id },
    "ru": { tools: ru },
  },
  lng: detectar(),
  fallbackLng: "es",
  ns: ["tools"],
  defaultNS: "tools",
  interpolation: { escapeValue: false },
});

export default i18n;
