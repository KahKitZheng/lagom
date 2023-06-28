export type Word = {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  sourceUrls: string[];
  meanings: Meaning[];
};

export type Phonetic = {
  text: string;
  audio?: string;
};

export type Meaning = {
  partOfSpeech: "string";
  definitions: Definition[];
};

export type Definition = {
  definition: string;
  example: string;
  synonyms: [];
  antonyms: [];
};
