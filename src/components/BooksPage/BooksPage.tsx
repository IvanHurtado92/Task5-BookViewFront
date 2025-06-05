"use client";

import { useState } from "react";
import { BooksList } from "../BookList/BookList";
import { BookSettingsPanel } from "../BookSettingsPanel/BookSettingsPanel";
import type { BookSettings } from "../models/BookSettings";

export const BooksPage: React.FC = () => {
  const [settings, setSettings] = useState<Omit<BookSettings, "page">>({
    locale: "en",
    seed: 0,
    likes: 10,
    reviews: 2.2,
  });
  const [page, setPage] = useState(0);

  // Reset page to 0 when settings (except page) change
  const handleSettingsChange = (newSettings: Omit<BookSettings, "page">) => {
    setSettings(newSettings);
    setPage(0);
  };

  return (
    <div className="space-y-6">
      <BookSettingsPanel
        settings={{ ...settings, page }}
        onChange={handleSettingsChange}
      />
      <BooksList settings={{ ...settings, page }} page={page} setPage={setPage} />
    </div>
  );
};
