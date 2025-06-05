export interface BookSettings {
  locale: LocaleOption;
  seed: number;
  page: number;
  likes: number;
  reviews: number;
}

export type LocaleOption = "en" | "es" | "it";

export type BookSettingsPanelProps = {
  settings: BookSettings;
  onChange: (newSettings: BookSettings) => void;
};