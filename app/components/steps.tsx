type Step = { title: string; text: string };

type Props = { steps: readonly Step[] };

export function Steps({ steps }: Props) {
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step.title} className="steps__item">
          <span className="steps__index" aria-hidden="true">
            {index + 1}
          </span>
          <h3 className="steps__title">{step.title}</h3>
          <p className="steps__text">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
