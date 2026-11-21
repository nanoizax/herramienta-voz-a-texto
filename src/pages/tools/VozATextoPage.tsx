import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Square, Copy, Check, Download, Info } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { LiveTranscriber, isSpeechRecognitionSupported } from "@/lib/tools/speechToText";
import { trackToolUsage } from "@/lib/hitCounter";

const VozATextoPage = () => {
  const { t, i18n } = useTranslation("tools");

  const [recording, setRecording] = useState(false);
  const [finalText, setFinalText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [copied, setCopied] = useState(false);
  const transcriberRef = useRef(new LiveTranscriber());

  const supported = isSpeechRecognitionSupported();

  const handleStart = () => {
    setRecording(true);
    setInterimText("");
    trackToolUsage("voz-a-texto");
    try {
      transcriberRef.current.start(
        i18n.language,
        (final, interim) => {
          setFinalText(final);
          setInterimText(interim);
        },
        () => setRecording(false)
      );
    } catch {
      setRecording(false);
    }
  };

  const handleStop = () => {
    transcriberRef.current.stop();
    setRecording(false);
    setInterimText("");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(finalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([finalText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcripcion.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFinalText("");
    setInterimText("");
  };

  if (!supported) {
    return (
      <ToolPageLayout toolId="voz-a-texto">
        <div className="border border-neutral-800 rounded-xl p-6 md:p-8 text-center">
          <p className="text-neutral-400">{t("ui.speech_not_supported")}</p>
        </div>
      </ToolPageLayout>
    );
  }

  return (
    <ToolPageLayout toolId="voz-a-texto">
      <div className="border border-neutral-800 rounded-xl p-6 md:p-8 space-y-5">
        <div
          role="note"
          className="flex items-start gap-3 rounded-lg border border-neutral-700 bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-200"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-neutral-300" aria-hidden="true" />
          <p>{t("ui.speech_privacy_notice")}</p>
        </div>

        <div className="flex justify-center">
          {!recording ? (
            <Button onClick={handleStart} className="bg-white text-black hover:bg-white/80 rounded-full px-8">
              <Mic className="w-4 h-4" />
              {t("ui.speech_start_button")}
            </Button>
          ) : (
            <Button onClick={handleStop} className="bg-red-600 text-white hover:bg-red-500 rounded-full px-8">
              <Square className="w-4 h-4" />
              {t("ui.speech_stop_button")}
            </Button>
          )}
        </div>

        {recording && (
          <p className="text-center text-neutral-500 text-sm animate-pulse">{t("ui.speech_listening")}</p>
        )}

        <div>
          <p className="text-neutral-400 text-sm mb-2">{t("ui.speech_transcript_label")}</p>
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm min-h-[8rem] max-h-[24rem] overflow-y-auto text-neutral-200 whitespace-pre-wrap">
            {finalText}
            <span className="text-neutral-500">{interimText}</span>
            {!finalText && !interimText && (
              <span className="text-neutral-600">{t("ui.speech_placeholder")}</span>
            )}
          </div>
        </div>

        {finalText && (
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleCopy}
              variant="outline"
              className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? t("ui.copied") : t("ui.copy_button")}
            </Button>
            <Button onClick={handleDownload} className="bg-white text-black hover:bg-white/80 rounded-full px-6">
              <Download className="w-4 h-4" />
              {t("ui.download_button")}
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
            >
              {t("ui.compare_reset_button")}
            </Button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default VozATextoPage;
