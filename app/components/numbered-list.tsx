type Item = { title: string; text: string; tagsLabel: string; tags: readonly string[] };

type Props = { items: readonly Item[] };

export function NumberedList({ items }: Props) {
  return (
    <ol className="service-list">
      {items.map((item, index) => (
        <li key={item.title} className="service-row">
          <span className="service-row__number mono" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="service-row__body">
            <h3 className="service-row__title">{item.title}</h3>
            <div>
              <p className="service-row__text">{item.text}</p>
              <ul className="tag-list mono" aria-label={item.tagsLabel}>
                {item.tags.map((tag) => (
                  <li key={tag} className="tag-list__item">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
