export function toJson(o: object): string {
  return JSON.stringify(o, null, 2);
}

export function parseToObjectIfString(unk: unknown): unknown {
  if (typeof unk === "string") return JSON.parse(unk);

  return unk;
}
