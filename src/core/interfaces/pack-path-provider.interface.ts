export interface PackPathProvider {
  getDefaultPath(): Promise<string>;
  getUserPath(): Promise<string>;
}
