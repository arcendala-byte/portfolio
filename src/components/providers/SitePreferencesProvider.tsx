"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { frenchTranslations } from "@/lib/translations";

export type SiteTheme = "light" | "dark";
export type SiteLocale = "en" | "fr";

interface SitePreferences {
  theme: SiteTheme;
  locale: SiteLocale;
  setTheme: (theme: SiteTheme) => void;
  setLocale: (locale: SiteLocale) => void;
  translate: (text: string) => string;
}

const PreferencesContext = createContext<SitePreferences | null>(null);
interface PreferencesSnapshot {
  theme: SiteTheme;
  locale: SiteLocale;
}

const defaultPreferences: PreferencesSnapshot = {
  theme: "light",
  locale: "en",
};
let preferencesSnapshot = defaultPreferences;
let preferencesInitialized = false;
const preferenceListeners = new Set<() => void>();

function initializePreferences() {
  if (preferencesInitialized || typeof window === "undefined") return;
  const storedTheme = window.localStorage.getItem("portfolio-theme");
  const storedLocale = window.localStorage.getItem("portfolio-locale");
  const theme: SiteTheme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
  const locale: SiteLocale =
    storedLocale === "en" || storedLocale === "fr" ? storedLocale : "en";

  preferencesSnapshot = { theme, locale };
  document.documentElement.dataset.theme = theme;
  document.documentElement.lang = locale;
  preferencesInitialized = true;
}

function subscribeToPreferences(listener: () => void) {
  initializePreferences();
  preferenceListeners.add(listener);
  return () => preferenceListeners.delete(listener);
}

function getPreferencesSnapshot() {
  initializePreferences();
  return preferencesSnapshot;
}

function getServerPreferencesSnapshot() {
  return defaultPreferences;
}

function updatePreferences(update: Partial<PreferencesSnapshot>) {
  initializePreferences();
  preferencesSnapshot = { ...preferencesSnapshot, ...update };
  document.documentElement.dataset.theme = preferencesSnapshot.theme;
  document.documentElement.lang = preferencesSnapshot.locale;
  window.localStorage.setItem("portfolio-theme", preferencesSnapshot.theme);
  window.localStorage.setItem("portfolio-locale", preferencesSnapshot.locale);
  preferenceListeners.forEach((listener) => listener());
}

export function useSitePreferences(): SitePreferences {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error(
      "useSitePreferences must be used inside <SitePreferencesProvider>",
    );
  }
  return context;
}

export function SitePreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme, locale } = useSyncExternalStore(
    subscribeToPreferences,
    getPreferencesSnapshot,
    getServerPreferencesSnapshot,
  );
  const setTheme = useCallback(
    (nextTheme: SiteTheme) => updatePreferences({ theme: nextTheme }),
    [],
  );
  const setLocale = useCallback(
    (nextLocale: SiteLocale) => updatePreferences({ locale: nextLocale }),
    [],
  );

  const translate = useCallback(
    (text: string) =>
      locale === "fr" ? (frenchTranslations[text] ?? text) : text,
    [locale],
  );
  const value = useMemo(
    () => ({ theme, locale, setTheme, setLocale, translate }),
    [theme, locale, setTheme, setLocale, translate],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}
