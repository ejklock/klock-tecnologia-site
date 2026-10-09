"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent, type ReactNode } from "react";

const DESKTOP_QUERY = "(min-width: 57rem)";

type Props = { label: string; children: ReactNode };

export function NavMenu({ label, children }: Props) {
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Remembering the path the panel was opened on closes it on any route change without an effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenedOn(null);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // The stored path would otherwise reopen the panel when the viewport returns below the breakpoint.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenedOn(null);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeOnLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) setOpenedOn(null);
  };

  return (
    <div className="nav-menu">
      <button
        ref={toggleRef}
        type="button"
        className="nav-menu__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={label}
        onClick={() => setOpenedOn(open ? null : pathname)}
      >
        <svg className="nav-menu__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <div
        id={panelId}
        className={open ? "nav-menu__panel nav-menu__panel--open" : "nav-menu__panel"}
        onClick={closeOnLinkClick}
      >
        {children}
      </div>
    </div>
  );
}
