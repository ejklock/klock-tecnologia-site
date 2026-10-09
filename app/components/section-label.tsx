import type { ReactNode } from "react";

type Props = {
  index: string;
  children: ReactNode;
  onBrand?: boolean;
  asHeading?: boolean;
};

export function SectionLabel({ index, children, onBrand = false, asHeading = false }: Props) {
  const className = `section-label${onBrand ? " section-label--on-brand" : ""} mono-label`;
  return (
    <div className={className}>
      <span aria-hidden="true" className="section-label__index">
        §{index}
      </span>
      {asHeading ? <h2 className="section-label__heading">{children}</h2> : <span>{children}</span>}
    </div>
  );
}
