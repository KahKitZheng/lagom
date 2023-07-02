export const getParamAsString = (word: string | undefined) => {
  if (word === undefined) {
    return "undefined";
  }
  //   if (word === null) {
  //     return "null";
  //   }
  return word;
};

// Return an array of all the letters in the alphabet
export const getAlphabetLetters = (): string[] => {
  const alphabet = [];
  for (let i = 97; i <= 122; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet;
};
