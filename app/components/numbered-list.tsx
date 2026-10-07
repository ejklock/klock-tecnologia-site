type Item = { title: string; text: string };

type Props = { items: readonly Item[]; tone?: "paper" | "ink" };

export function NumberedList({ items, tone = "paper" }: Props) {
  return (
    <ol className={`numbered-list numbered-list--${tone}`}>
      {items.map((item, index) => (
        <li key={item.title} className="service-row">
          <span className="service-row__number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="service-row__title">{item.title}</h3>
            <p className="service-row__text">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
