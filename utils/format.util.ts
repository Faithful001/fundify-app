import { ethers } from "ethers";

export class Format {
  public static truncateString(
    string: string,
    start: number = 0,
    end: number = 5,
    addEllipsis: boolean = true
  ) {
    const truncatedString =
      string?.slice(start, end) + addEllipsis ? "..." : "";
    return truncatedString;
  }

  public static bigNumber(number: string | number): string {
    return number
      ? ethers.utils.formatEther(
          ethers.BigNumber.from(Math.floor(Number(number) * 1e18).toString())
        )
      : "0";
  }

  /*
   * Convert the data returned from block.timestamp to date
   *
   * @param1 - blockTimeStamp: number
   * @returns - string
   */
  public static convertToDate(blockTimeStamp: number) {
    return new Date(blockTimeStamp * 1000)?.toISOString().split("T")[0] || "0";
  }

  /*
   * Convert the date to block.timestamp for the contract
   *
   * @param1 - dateString: number
   * @returns - number
   */
  public static convertToBlockTimeStamp(dateString: string): number {
    return Math.floor(new Date(dateString).getTime() / 1000);
  }
}
