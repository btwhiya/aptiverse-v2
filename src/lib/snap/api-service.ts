/**
 * Free & Open API Integration Service for SNAP Preparation
 * Uses Free Dictionary API & Datamuse Open Lexical API with automatic local fallback.
 * Strictly avoids exposing secret keys to client-side bundles.
 */

export interface WordDefinitionResult {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definition: string;
  synonyms: string[];
  antonyms: string[];
  exampleSentence?: string;
  source: "API" | "LOCAL_FALLBACK";
}

// Robust local fallback dictionary for offline resilience
const LOCAL_FALLBACK_DICTIONARY: Record<string, WordDefinitionResult> = {
  ephemeral: {
    word: "ephemeral",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time; transitory.",
    synonyms: ["transient", "fleeting", "short-lived", "evanescent", "momentary"],
    antonyms: ["permanent", "eternal", "perpetual", "enduring", "everlasting"],
    exampleSentence: "Social media virality is often ephemeral, fading within hours.",
    source: "LOCAL_FALLBACK",
  },
  pragmatic: {
    word: "pragmatic",
    partOfSpeech: "adjective",
    definition: "Dealing with things sensibly and realistically based on practical considerations rather than theoretical ones.",
    synonyms: ["practical", "utilitarian", "sensible", "hard-headed", "realistic"],
    antonyms: ["idealistic", "impractical", "visionary", "utopian", "quixotic"],
    exampleSentence: "The CEO took a pragmatic approach to cost-cutting during the downturn.",
    source: "LOCAL_FALLBACK",
  },
  alleviate: {
    word: "alleviate",
    partOfSpeech: "verb",
    definition: "Make (suffering, deficiency, or a problem) less severe.",
    synonyms: ["mitigate", "relieve", "ease", "lessen", "palliate"],
    antonyms: ["aggravate", "exacerbate", "worsen", "intensify"],
    exampleSentence: "The central bank introduced rate cuts to alleviate liquidity pressures.",
    source: "LOCAL_FALLBACK",
  },
  tenacious: {
    word: "tenacious",
    partOfSpeech: "adjective",
    definition: "Tending to keep a firm hold of something; clinging or persisting tirelessly.",
    synonyms: ["resolute", "persistent", "dogged", "determined", "stubborn"],
    antonyms: ["irresolute", "wavering", "yielding", "lax", "surrendering"],
    exampleSentence: "Her tenacious investigative reporting uncovered the corporate scam.",
    source: "LOCAL_FALLBACK",
  },
  ubiquitous: {
    word: "ubiquitous",
    partOfSpeech: "adjective",
    definition: "Present, appearing, or found everywhere simultaneously.",
    synonyms: ["omnipresent", "pervasive", "universal", "widespread", "prevalent"],
    antonyms: ["rare", "scarce", "infrequent", "isolated", "seldom"],
    exampleSentence: "Smartphones have become ubiquitous in urban daily commerce.",
    source: "LOCAL_FALLBACK",
  },
};

/**
 * Fetch word enrichment using Free Dictionary API + Datamuse Open API.
 * Safely falls back to local knowledge base if API fails, times out, or has no connection.
 */
export async function fetchWordEnrichment(word: string): Promise<WordDefinitionResult> {
  const cleanWord = word.trim().toLowerCase();

  // Check if internet call is viable
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s maximum timeout

    // 1. Free Dictionary API (public open educational service)
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const entry = data[0];
        const meaning = entry.meanings?.[0];
        const defObj = meaning?.definitions?.[0];

        // Also fetch synonyms from Datamuse if dictionary list is sparse
        let synonyms: string[] = meaning?.synonyms || [];
        if (synonyms.length < 3) {
          try {
            const datamuseRes = await fetch(`https://api.datamuse.com/words?rel_syn=${cleanWord}&max=5`);
            if (datamuseRes.ok) {
              const dmData: { word: string }[] = await datamuseRes.json();
              synonyms = Array.from(new Set([...synonyms, ...dmData.map((d) => d.word)]));
            }
          } catch {
            // Ignore auxiliary datamuse failure
          }
        }

        return {
          word: entry.word,
          phonetic: entry.phonetic || entry.phonetics?.[0]?.text,
          partOfSpeech: meaning?.partOfSpeech || "noun",
          definition: defObj?.definition || "Definition available in Aptiverse SNAP glossary.",
          synonyms: synonyms.slice(0, 5),
          antonyms: (meaning?.antonyms || []).slice(0, 5),
          exampleSentence: defObj?.example,
          source: "API",
        };
      }
    }
  } catch (err) {
    // API error / timeout / network drop -> gracefully use local fallback
    console.warn(`[SNAP API Service] External API unavailable for '${word}', switching to local fallback.`, err);
  }

  // Graceful local fallback
  if (LOCAL_FALLBACK_DICTIONARY[cleanWord]) {
    return LOCAL_FALLBACK_DICTIONARY[cleanWord];
  }

  // Generic fallback if word is not pre-cached
  return {
    word: cleanWord,
    partOfSpeech: "noun / adjective",
    definition: `Key SNAP vocabulary term: '${cleanWord}'. Refer to Aptiverse SNAP curated vocabulary masterlist.`,
    synonyms: ["contextual equivalent", "comparable term"],
    antonyms: ["opposite concept"],
    source: "LOCAL_FALLBACK",
  };
}

export type WordEnrichmentResult = WordDefinitionResult;
export const LOCAL_SNAP_VOCAB_FALLBACK = LOCAL_FALLBACK_DICTIONARY;

