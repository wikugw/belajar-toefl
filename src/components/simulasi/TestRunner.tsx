"use client";

import { memo } from "react";
import { AudioControls } from "../AudioControls";
import { Passage } from "../Passage";
import { Question } from "../Question";
import { answer, markPlayed, matchesFilter, testStore, type RunBlock, type RunItem } from "@/lib/testSession";
import { TestBar } from "./TestBar";

type ItemProps = {
  item: RunItem;
  chosen: number | null;
  revealed: boolean;
  hidden: boolean;
  playOnce: boolean;
  played: boolean;
};

const TestQuestion = memo(function TestQuestion({ item, chosen, revealed, hidden, playOnce, played }: ItemProps) {
  return (
    <Question
      item={item}
      num={item.num}
      kind={item.kind}
      mode="test"
      chosen={chosen}
      revealed={revealed}
      hidden={hidden}
      onChoose={(c) => answer(item.index, c)}
      playOnce={playOnce}
      played={played}
      onPlayed={() => markPlayed(`q${item.index}`)}
    />
  );
});

function GroupAudio({ block, once, played, done }: { block: RunBlock; once: boolean; played: boolean; done: boolean }) {
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

export function TestRunner() {
  const session = testStore.use((s) => s);
  if (!session) return null;
  const { def, sections, ans, sec, played, result, filter } = session;
  const done = !!result;

  return (
    <div id="simRun" className="stack-lg">
      {!done && <TestBar />}
      {sections.map((section, si) =>
        !done && def.sequential && si !== sec ? null : (
          <div key={si} className="stack-lg">
            <div className="stack">
              <div className={`part-title ${section.cls}`}>
                <h3>{section.title}</h3>
                <span className="note">{section.sub}</span>
              </div>
              {section.directions && <p className="note">{section.directions}</p>}
            </div>
            {section.blocks.map((b) => (
              <div key={b.id} className="stack">
                {b.title && <h3>{b.title}</h3>}
                {b.note && <p className="note">{b.note}</p>}
                {b.passage && <Passage passage={b.passage} />}
                {b.script && <GroupAudio block={b} once={def.playOnce} played={!!played[`g${b.id}`]} done={done} />}
                {b.items.map((it) => (
                  <TestQuestion
                    key={it.index}
                    item={it}
                    chosen={ans[it.index]}
                    revealed={done}
                    hidden={done && !matchesFilter(it, ans[it.index], filter)}
                    playOnce={def.playOnce}
                    played={!!played[`q${it.index}`]}
                  />
                ))}
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  );
}
