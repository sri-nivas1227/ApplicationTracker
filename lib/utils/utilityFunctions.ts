export function titleCase(phrase:string) {
  return phrase.trim().replace(/\b\w/g, (char) => char.toUpperCase());
}
