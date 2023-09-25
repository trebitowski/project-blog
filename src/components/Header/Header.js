"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants";

function Header({ theme: initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    // update styles
    // Apply the new colors to the root HTML tag.
    const COLORS = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    const root = document.documentElement;

    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(COLORS).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button onClick={toggleTheme} className={styles.action}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
