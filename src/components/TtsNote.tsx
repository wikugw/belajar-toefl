"use client";

import { speechStore } from "@/lib/speech";

export function TtsNote() {
  const supported = speechStore.use((s) => s.supported);
  return (
    <p className="note">
      {supported ? (
        <>
          Tekan <b>Putar</b> untuk mendengar dialog (memakai suara bawaan perangkatmu). Di tes asli audio hanya diputar
          sekali, jadi coba jawab setelah sekali dengar.
        </>
      ) : (
        "Perangkatmu tidak mendukung suara otomatis. Baca transkripnya dengan suara keras atau minta teman membacakannya, lalu jawab tanpa melihat teks."
      )}
    </p>
  );
}
