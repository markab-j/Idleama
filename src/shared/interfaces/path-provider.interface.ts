export interface PathProvider {
  getDefaultPath(): Promise<string>;
  getUserPath(): Promise<string>;
}
