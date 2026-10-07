type Step = { title: string; text: string };

type Props = { steps: readonly Step[] };

export function Steps({ steps }: Props) {
  return (
    <ol className="rows">
      {steps.map((step, index) => (
        <li key={step.title} className="row">
          <span className="row__number" aria-hidden="true">
            {index + 1}
          </span>
          <div>
            <h3 className="row__title">{step.title}</h3>
            <p className="row__text">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
