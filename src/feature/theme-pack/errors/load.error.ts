import type z from "zod";

export class ThemePackError extends Error {
  constructor(
    message: string,
    public readonly path: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ThemePackJsonNotFoundError extends ThemePackError {
  constructor(path: string) {
    super(`'pack.json' not found in theme directory`, path);
  }
}

export class ThemePackParseError extends ThemePackError {
  constructor(
    path: string,
    public readonly zodError: z.ZodError,
  ) {
    super(`Failed to parse pack.json at ${path}`, path);
  }
}

export class AssetNotFoundError extends ThemePackError {
  constructor(path: string, missingFiles: string[]) {
    super(`Missing asset files: ${missingFiles.join(", ")} in ${path}`, path);
  }
}
