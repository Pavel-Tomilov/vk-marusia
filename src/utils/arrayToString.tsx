export function arrayToString(array: string[] | undefined | null): string {
  if (!array || array.length === 0) {
    return "";
  }

  return array.length === 1 ? array[0] : array.join(" / ");
}
