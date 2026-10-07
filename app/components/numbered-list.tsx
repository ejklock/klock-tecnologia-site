type Item = { title: string; text: string };

type Props = { items: readonly Item[] };

export function NumberedList({ items }: Props) {
  return (
    <ol className="rows">
      {items.map((item, index) => (
        <li key={item.title} className="row service-row">
          <span className="row__number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="row__title">{item.title}</h3>
            <p className="row__text">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
