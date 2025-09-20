import { type Languege, LanguegeSchema } from "@core/schema/lang.schema";
import { BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import type { BackendModule, ReadCallback } from "i18next";

const languageCache: { [lang: string]: Languege } = {};

const TauriFsBackend: BackendModule = {
  type: "backend",
  init() {},
  async read(language: string, namespace: string, callback: ReadCallback) {
    try {
      if (!languageCache[language]) {
        console.log(`Reading and caching language file for: ${language}`);
        const jsonString = await readTextFile(`lang/${language}.json`, {
          baseDir: BaseDirectory.Resource,
        });
        languageCache[language] = LanguegeSchema.parse(jsonString);
      }

      const allTranslations = languageCache[language];

      if (namespace in allTranslations) {
        const namespaceData = allTranslations[namespace as keyof Languege];
        callback(null, namespaceData);
      } else {
        callback(
          new Error(
            `Namespace "${namespace}" not found for language "${language}"`,
          ),
          {},
        );
      }
    } catch (error) {
      console.error(error);
      callback(error as Error, {});
    }
  },
};

export default TauriFsBackend;
