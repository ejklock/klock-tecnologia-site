type Step = { title: string; text: string };

type Props = { steps: readonly Step[]; prefix?: string };

export function Steps({ steps, prefix }: Props) {
  return (
    <ol className="steps">
      {steps.map((step, index) => {
        const number = String(index + 1).padStart(2, "0");
        return (
          <li key={step.title} className="steps__item">
            <span className="steps__number mono">{prefix === undefined ? number : `${prefix} ${number}`}</span>
            <h3 className="steps__title">{step.title}</h3>
            <p className="steps__text">{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}
