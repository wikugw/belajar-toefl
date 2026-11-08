"use client";

import { memo } from "react";
import { Question } from "../Question";
import { answer, markPlayed, matchesFilter, testStore, type RunItem } from "@/lib/testSession";
import { GroupAudio, RunSections } from "./RunSections";
import { TestBar } from "./TestBar";

type ItemProps = {
  item: RunItem;
  chosen: number | null;
  revealed: boolean;
  hidden: boolean;
  playOnce: boolean;
  played: boolean;
};

export const TestQuestion = memo(function TestQuestion({
  item,
  chosen,
  revealed,
  hidden,
  playOnce,
  played,
}: ItemProps) {
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

export function TestRunner() {
  const session = testStore.use((s) => s);
  if (!session) return null;
  const { def, sections, ans, sec, played, result, filter } = session;
  const done = !!result;
  const visible = !done && def.sequential ? sections.slice(sec, sec + 1) : sections;

  return (
    <div id="simRun" className="stack-lg">
      {!done && <TestBar />}
      <RunSections
        sections={visible}
        renderGroup={(b) => (
          <GroupAudio key={b.id} block={b} once={def.playOnce} played={!!played[`g${b.id}`]} done={done} />
        )}
        renderItem={(it) => (
          <TestQuestion
            key={it.index}
            item={it}
            chosen={ans[it.index]}
            revealed={done}
            hidden={done && !matchesFilter(it, ans[it.index], filter)}
            playOnce={def.playOnce}
            played={!!played[`q${it.index}`]}
          />
        )}
      />
    </div>
  );
}
