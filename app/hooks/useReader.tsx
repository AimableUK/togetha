export function aOrAn(word: string) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}
