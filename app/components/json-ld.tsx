type Props = { data: Readonly<Record<string, unknown>> };

export function JsonLd({ data }: Props) {
  // A literal "<" in the payload could close the script tag early; the JSON unicode escape keeps it inert.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
