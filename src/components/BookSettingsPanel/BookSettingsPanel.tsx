import React, { useState } from "react";
import type { BookSettings, BookSettingsPanelProps, LocaleOption } from "../models/BookSettings";


export const BookSettingsPanel: React.FC<BookSettingsPanelProps> = ({ settings, onChange }) => {

   const [localSettings, setLocalSettings] = useState<BookSettings>(settings);

  const updateField = (field: keyof BookSettings, value: number | string) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onChange(updated);
  };

  const randomSeed = () => {
    const seed = Math.floor(Math.random() * 1000000);
    updateField("seed", seed);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl grid gap-4 md:grid-cols-2">
      {/* Locale Selector */}
      <div>
        <label className="block font-semibold mb-1">🌍 Language / Region</label>
        <select
          value={localSettings.locale}
          onChange={(e) => updateField("locale", e.target.value as LocaleOption)}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="en">English (US)</option>
          <option value="es">Español (ES)</option>
          <option value="it">Italiano (IT)</option>
        </select>
      </div>

      {/* Seed input */}
      <div>
        <label className="block font-semibold mb-1">🔢 Seed</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={localSettings.seed}
            onChange={(e) => updateField("seed", parseInt(e.target.value))}
          />
          <button
            type="button"
            onClick={randomSeed}
            className="bg-gray-200 px-3 rounded hover:bg-gray-300"
            title="Generate random seed"
          >
            🎲
          </button>
        </div>
      </div>

      {/* Likes slider */}
      <div>
        <label className="block font-semibold mb-1">
          ❤️ Avg Likes per Book: {localSettings.likes.toFixed(1)}
        </label>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={localSettings.likes}
          onChange={(e) => updateField("likes", parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Reviews input */}
      <div>
        <label className="block font-semibold mb-1">📝 Avg Reviews per Book</label>
        <input
          type="number"
          min={0}
          max={10}
          step={0.1}
          className="w-full border px-2 py-1 rounded"
          value={localSettings.reviews}
          onChange={(e) => updateField("reviews", parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};
