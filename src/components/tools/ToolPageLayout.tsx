import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IDIOMAS, cambiarIdioma } from "@/i18n";

interface ToolPageLayoutProps {
  toolId: string;
  children: ReactNode;
}

/**
 * Armazón neutro de la herramienta: título, la herramienta y su documentación (cómo funciona,
 * para qué sirve, preguntas frecuentes). No incluye navegación, analítica, cookies ni contadores.
 * Cámbialo por el diseño de tu plataforma: solo tiene que pintar `children`.
 */
const ToolPageLayout = ({ toolId, children }: ToolPageLayoutProps) => {
  const { t, i18n } = useTranslation("tools");
  const val = (clave: string) => t(`items.${toolId}.${clave}`, { defaultValue: "" });

  const title = val("title");
  const description = val("description");
  const intro = val("intro");
  const pasos = [1, 2, 3].map((n) => ({ titulo: val(`step${n}Title`), texto: val(`step${n}Text`) })).filter((p) => p.titulo && p.texto);
  const casos = [1, 2, 3].map((n) => val(`useCase${n}`)).filter(Boolean);
  const faq = [1, 2, 3, 4, 5].map((n) => ({ q: val(`faq${n}q`), a: val(`faq${n}a`) })).filter((f) => f.q && f.a);

  useEffect(() => {
    document.title = val("seoTitle") || title;
    document.documentElement.lang = i18n.language;
  }, [i18n.language, title]);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 max-w-3xl flex justify-end">
        <label className="text-neutral-400 text-sm flex items-center gap-2">
          <span className="sr-only">Idioma</span>
          <select
            value={i18n.language}
            onChange={(e) => cambiarIdioma(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 rounded-md px-2 py-1 text-neutral-200"
          >
            {IDIOMAS.map(([codigo, nombre]) => (
              <option key={codigo} value={codigo}>{nombre}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3 text-center">{title}</h1>
        <p className="text-neutral-400 text-center mb-10 max-w-xl mx-auto">{description}</p>

        {children}

        {intro && (
          <section className="mt-16 pt-10 border-t border-neutral-800">
            <p className="text-neutral-300 leading-relaxed">{intro}</p>
          </section>
        )}

        {pasos.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">{val("stepsHeading") || t("content.steps_heading", { defaultValue: "How it works" })}</h2>
            <ol className="space-y-6">
              {pasos.map((p, i) => (
                <li key={i} className="flex gap-4">
                  <span aria-hidden="true" className="flex-shrink-0 w-8 h-8 rounded-full border border-neutral-700 text-neutral-300 flex items-center justify-center text-sm">{i + 1}</span>
                  <div>
                    <h3 className="text-white font-medium mb-1">{p.titulo}</h3>
                    <p className="text-neutral-400 leading-relaxed">{p.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {casos.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">{val("useCasesHeading") || t("content.use_cases_heading", { defaultValue: "Use cases" })}</h2>
            <ul className="space-y-3">
              {casos.map((c, i) => (
                <li key={i} className="text-neutral-400 leading-relaxed pl-5 relative">
                  <span aria-hidden="true" className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-orange-600" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {faq.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">{val("faqHeading") || t("content.faq_heading", { defaultValue: "FAQ" })}</h2>
            <div className="space-y-6">
              {faq.map((f, i) => (
                <div key={i}>
                  <h3 className="text-white font-medium mb-2">{f.q}</h3>
                  <p className="text-neutral-400 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-600">
        Código abierto · licencia MIT · github.com/nanoizax/herramienta-voz-a-texto
      </footer>
    </div>
  );
};

export default ToolPageLayout;
