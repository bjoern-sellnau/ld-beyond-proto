"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, PauseIcon, SparklesIcon, SunIcon } from "@/components/icons";

const buttonClass =
  "flex size-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:scale-105 hover:border-accent/50 hover:text-foreground active:scale-95";

/**
 * Theme und Animations-Flag leben als Klasse/Attribut auf <html>
 * (gesetzt vom Bootstrap-Script im Layout). Die Toggles lesen diesen
 * Zustand über useSyncExternalStore und melden Änderungen per Event.
 */
const SETTINGS_EVENT = "ld-settings";

function subscribe(callback: () => void) {
  window.addEventListener(SETTINGS_EVENT, callback);
  return () => window.removeEventListener(SETTINGS_EVENT, callback);
}

function notify() {
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );

  function toggle() {
    document.documentElement.classList.toggle("dark", !dark);
    localStorage.setItem("ld-theme", !dark ? "dark" : "light");
    notify();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonClass}
      aria-label={dark ? "Zum hellen Design wechseln" : "Zum dunklen Design wechseln"}
      title="Design wechseln"
    >
      {dark ? <SunIcon className="size-4.5" /> : <MoonIcon className="size-4.5" />}
    </button>
  );
}

export function MotionToggle() {
  const motion = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.motion !== "off",
    () => true,
  );

  function toggle() {
    document.documentElement.dataset.motion = motion ? "off" : "on";
    localStorage.setItem("ld-motion", motion ? "off" : "on");
    notify();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonClass}
      aria-label={motion ? "Animationen ausschalten" : "Animationen einschalten"}
      aria-pressed={!motion}
      title="Animationen umschalten"
    >
      {motion ? <SparklesIcon className="size-4.5" /> : <PauseIcon className="size-4.5" />}
    </button>
  );
}
