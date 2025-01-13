export class LocalStorage {
  private static isLocalStorageAvailable(): boolean {
    return (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    );
  }

  public static get(name: string) {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }
    const data = localStorage.getItem(name);
    return data ? data : null;
  }

  public static set(name: string, data: any): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    localStorage.setItem(name, JSON.stringify(data));
  }

  public static remove(name: string): void {
    if (!this.isLocalStorageAvailable()) {
      return;
    }
    localStorage.removeItem(name);
  }
}
