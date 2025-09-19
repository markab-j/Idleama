interface Logger {
  log: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
}

const dummyLogger: Logger = {
  log: () => {},
  warn: () => {},
  error: () => {},
};

export function createLogger(prefix: string): Logger {
  if (import.meta.env.DEV) {
    const formattedPrefix = `[${prefix}]`;
    return {
      log: (...args) => console.log(formattedPrefix, ...args),
      warn: (...args) => console.warn(formattedPrefix, ...args),
      error: (...args) => console.error(formattedPrefix, ...args),
    };
  }

  return dummyLogger;
}
