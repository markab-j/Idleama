export interface ThemePackConfigStore {
  load(): Promise<void>;
  save(): Promise<void>;
  setCurrentPackName(packName: string): Promise<void>;
  getCurrentPackName(): string;
}
