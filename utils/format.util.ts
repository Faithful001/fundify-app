export class Format {
  public static truncateString(string: string) {
    const truncatedString = string.slice(0, 5) + "...";
    return truncatedString;
  }
}
