type Props = { words: readonly string[] };

const LOOP_COPIES = 4;

export function Marquee({ words }: Props) {
  const sequence = Array.from({ length: LOOP_COPIES }, () => words).flat();

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {sequence.map((word, index) => (
          <span key={index} className="marquee__item">
            {word}
            <span className="marquee__sep">\</span>
          </span>
        ))}
      </div>
    </div>
  );
}
