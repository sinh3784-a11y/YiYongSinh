import { useEffect, useRef, useState } from "react";

import { navIds, navLinks } from "../data/navigation";
import { profile } from "../data/profile";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useScrolled, useScrollSpy } from "../hooks/useScrollSpy";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const activeId = useScrollSpy(navIds);
  const isScrolled = useScrolled();

  useScrollProgress(progressRef);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((previous) => !previous);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={isScrolled ? "navbar navbar-scrolled" : "navbar"}
    >
      <div className="navbar-inner">
        {/* LOGO */}
        <a
          href="#home"
          className="logo"
          onClick={closeMenu}
          aria-label={`${profile.name} — back to top`}
        >
          {profile.initials}
          <span>.</span>
        </a>

        {/* NAVIGATION LINKS */}
        <nav
          id="primary-navigation"
          className={isMenuOpen ? "nav-links nav-links-open" : "nav-links"}
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const isActive = activeId === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={isActive ? "nav-link nav-link-active" : "nav-link"}
                aria-current={isActive ? "location" : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT SIDE ACTION BUTTONS */}
        <div className="nav-actions">
          {/* VIEW CV */}
          <a
            href="/YI_YONGSINH_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cv-btn"
            onClick={closeMenu}
          >
            View CV
          </a>

          {/* DARK / LIGHT MODE */}
          <div className="nav-theme-toggle">
            <ThemeToggle />
          </div>

          {/* MOBILE MENU */}
          <button
            type="button"
            className="menu-button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
          >
            <Icon name={isMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* SCROLL PROGRESS */}
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
    </header>
  );
}

export default Navbar;
