import type z from "zod";
import type { PackType } from "../enum/pack.enum";

export class PackError extends Error {
  constructor(
    public readonly type: PackType,
    public readonly message: string,
    public readonly path: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class PackJsonNotFoundError extends PackError {
  constructor(type: PackType, path: string) {
    super(type, `'pack.json' not found in theme directory`, path);
  }
}

export class PackParseError extends PackError {
  constructor(
    type: PackType,
    path: string,
    public readonly zodError: z.ZodError,
  ) {
    super(type, `Failed to parse pack.json at ${path}`, path);
  }
}

export class PackAssetNotFoundError extends PackError {
  constructor(type: PackType, path: string, missingFiles: string[]) {
    super(
      type,
      `Missing asset files: ${missingFiles.join(", ")} in ${path}`,
      path,
    );
  }
}
