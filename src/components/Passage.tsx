import type { Passage as PassageData } from "@/lib/types";

export function Passage({ passage }: { passage: PassageData }) {
  return (
    <article className="passage">
      <div className="eyebrow" style={{ marginBottom: 8 }}>
        Teks bacaan · {passage.title}
      </div>
      {passage.paras.map((t, i) => (
        <p key={i}>
          <span className="ln">¶{i + 1}</span>
          {t}
        </p>
      ))}
    </article>
  );
}
