export function isSpeechRecognitionSupported(): boolean {
  return Boolean(
    (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
      .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
  );
}

interface MinimalSpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: unknown) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
}

const LANG_BY_SITE_LANG: Record<string, string> = {
  es: "es-ES",
  en: "en-US",
  fr: "fr-FR",
  "pt-BR": "pt-BR",
  de: "de-DE",
  ru: "ru-RU",
  hi: "hi-IN",
  id: "id-ID",
};

interface SpeechResultAlternative {
  transcript: string;
}
interface SpeechResultItem {
  0: SpeechResultAlternative;
  isFinal: boolean;
}
interface SpeechResultEvent {
  resultIndex: number;
  results: ArrayLike<SpeechResultItem>;
}

export class LiveTranscriber {
  private recognition: MinimalSpeechRecognition | null = null;

  start(
    siteLang: string,
    onTranscript: (finalText: string, interimText: string) => void,
    onEnd: () => void
  ) {
    const Ctor = (
      window as unknown as {
        SpeechRecognition?: new () => MinimalSpeechRecognition;
        webkitSpeechRecognition?: new () => MinimalSpeechRecognition;
      }
    ).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => MinimalSpeechRecognition })
        .webkitSpeechRecognition;

    if (!Ctor) throw new Error("not-supported");

    const recognition = new Ctor();
    recognition.lang = LANG_BY_SITE_LANG[siteLang] || "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    let finalText = "";
    recognition.onresult = (rawEvent: unknown) => {
      const event = rawEvent as SpeechResultEvent;
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }
      onTranscript(finalText, interim);
    };
    recognition.onend = onEnd;
    recognition.onerror = onEnd;

    this.recognition = recognition;
    recognition.start();
  }

  stop() {
    this.recognition?.stop();
    this.recognition = null;
  }
}
