"use client";

import { useState } from "react";
import { BooksList } from "../BookList/BookList";
import { BookSettingsPanel } from "../BookSettingsPanel/BookSettingsPanel";
import type { BookSettings } from "../models/BookSettings";

export const BooksPage: React.FC = () => {
  const [settings, setSettings] = useState<BookSettings>({
    locale: "en",
    seed: 0,
    page: 0,
    likes: 10,
    reviews: 2.2,
  });

  return (
    <div className="space-y-6">
      <BookSettingsPanel settings={settings} onChange={setSettings} />
      <BooksList settings={settings} />
    </div>
  );
};
