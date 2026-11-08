"use client";

import type { ReactNode } from "react";
import { AudioControls } from "../AudioControls";
import { Passage } from "../Passage";
import { markPlayed, type RunBlock, type RunItem, type RunSection } from "@/lib/testSession";

type GroupProps = { block: RunBlock; once?: boolean; played?: boolean; done?: boolean };

export function GroupAudio({ block, once, played, done }: GroupProps) {
  const label = block.label as string;
  return (
    <div className="q group">
      <div className="q-head">
        <span className="no">{label}</span>
        <span>Listening</span>
      </div>
      <p className="note">Dengarkan dulu sampai selesai, lalu putar pertanyaan di setiap soal di bawahnya.</p>
      <AudioControls
        script={block.script!}
        playLabel={`Putar ${label.toLowerCase()}`}
        playClassName="btn"
        once={once && !done}
        played={played}
        onPlayed={() => markPlayed(`g${block.id}`)}
        lockTranscript={!done}
      />
    </div>
  );
}

type Props = {
  sections: RunSection[];
  renderItem: (item: RunItem) => ReactNode;
  renderGroup?: (block: RunBlock) => ReactNode;
  /** Sembunyikan petunjuk tes; dipakai saat yang tampil hanya sebagian soal. */
  compact?: boolean;
};

export function RunSections({ sections, renderItem, renderGroup, compact }: Props) {
  return sections.map((section) => (
    <div key={section.title} className="stack-lg">
      <div className="stack">
        <div className={`part-title ${section.cls}`}>
          <h3>{section.title}</h3>
          {!compact && <span className="note">{section.sub}</span>}
        </div>
        {!compact && section.directions && <p className="note">{section.directions}</p>}
      </div>
      {section.blocks.map((b) => (
        <div key={b.id} className="stack">
          {b.title && <h3>{b.title}</h3>}
          {!compact && b.note && <p className="note">{b.note}</p>}
          {b.passage && <Passage passage={b.passage} />}
          {b.script && (renderGroup ? renderGroup(b) : <GroupAudio block={b} done />)}
          {b.items.map(renderItem)}
        </div>
      ))}
    </div>
  ));
}
