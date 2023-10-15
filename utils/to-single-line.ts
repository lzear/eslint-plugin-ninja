export const toSingleLine = (string: string): string =>
  string.replaceAll(/\s\s+/g, ' ').trim()
