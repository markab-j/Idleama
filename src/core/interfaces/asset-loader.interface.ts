import type { ReadonlyDeep } from "type-fest";

export interface AssetRegistrar<T> {
  load(asset: ReadonlyDeep<T>): void;
}
