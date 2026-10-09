"use client";

import { useSyncExternalStore } from "react";

const zones = [
  { key: "saoPaulo", timeZone: "America/Sao_Paulo" },
  { key: "newYork", timeZone: "America/New_York" },
  { key: "portland", timeZone: "America/Los_Angeles" },
  { key: "lisbon", timeZone: "Europe/Lisbon" },
] as const;

type ZoneKey = (typeof zones)[number]["key"];

const REFRESH_MS = 15_000;
const MINUTE_MS = 60_000;
const PLACEHOLDER = "--:--";

function subscribe(onChange: () => void): () => void {
  const timer = setInterval(onChange, REFRESH_MS);
  return () => clearInterval(timer);
}

// Whole minutes keep the snapshot stable between ticks, so a refresh re-renders only when a displayed time changes.
function currentMinute(): number {
  return Math.floor(Date.now() / MINUTE_MS);
}

function noTimeOnServer(): undefined {
  return undefined;
}

type Props = {
  lang: string;
  labels: Record<ZoneKey, string>;
  variant: "hero" | "contact";
};

export function LiveClocks({ lang, labels, variant }: Props) {
  const minute = useSyncExternalStore<number | undefined>(subscribe, currentMinute, noTimeOnServer);

  return (
    <span className={`clocks clocks--${variant}`}>
      {zones.map(({ key, timeZone }) => {
        const time =
          minute === undefined
            ? PLACEHOLDER
            : new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone }).format(
                minute * MINUTE_MS,
              );
        return (
          <span key={key} className="clocks__zone">
            <span className="clocks__label">{labels[key]}</span> <span className="clocks__time">{time}</span>
          </span>
        );
      })}
    </span>
  );
}
