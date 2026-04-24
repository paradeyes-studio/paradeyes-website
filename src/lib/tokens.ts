/**
 * Paradeyes design tokens (TypeScript surface).
 * Source of truth : reference/paradeyes-home-v5.1.html :root + src/app/globals.css.
 * Keep this file in sync with globals.css — values must match.
 */

export const colors = {
  greenDeep: "#003135",
  greenElectric: "#57EEA1",
  darkBluish: "#14222E",
  violetSpark: "#6549F6",
  whiteWarm: "#FAFAF7",
  orangeFlame: "#FF611D",
  blueSteel: "#4A6CFF",
  redDanger: "#E63946",
} as const;

export const grays = {
  50: "#F5F6F7",
  100: "#E9ECEF",
  200: "#DEE2E6",
  300: "#CED4DA",
  400: "#6C757D",
  500: "#495057",
  600: "#343A40",
  700: "#212529",
} as const;

export const alphaGreenDeep = {
  "04": "rgba(0, 49, 53, 0.04)",
  "06": "rgba(0, 49, 53, 0.06)",
  "08": "rgba(0, 49, 53, 0.08)",
  "12": "rgba(0, 49, 53, 0.12)",
  "24": "rgba(0, 49, 53, 0.24)",
  "60": "rgba(0, 49, 53, 0.60)",
} as const;

export const alphaGreenElectric = {
  "20": "rgba(87, 238, 161, 0.20)",
  "40": "rgba(87, 238, 161, 0.40)",
} as const;

export const alphaWhite = {
  "08": "rgba(255, 255, 255, 0.08)",
  "12": "rgba(255, 255, 255, 0.12)",
  "16": "rgba(255, 255, 255, 0.16)",
  "24": "rgba(255, 255, 255, 0.24)",
  "40": "rgba(255, 255, 255, 0.40)",
  "60": "rgba(255, 255, 255, 0.60)",
  "72": "rgba(255, 255, 255, 0.72)",
} as const;

export const spacing = {
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 24,
  s6: 32,
  s7: 48,
  s8: 64,
  s9: 96,
  s10: 128,
  s11: 160,
  s12: 200,
} as const;

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 48,
  pill: 999,
} as const;

export const shadows = {
  sm: "0 2px 8px rgba(0, 49, 53, 0.06)",
  md: "0 8px 24px rgba(0, 49, 53, 0.08)",
  lg: "0 16px 40px rgba(0, 49, 53, 0.12)",
  xl: "0 24px 64px rgba(0, 49, 53, 0.16)",
  onDarkMd: "0 8px 24px rgba(0, 0, 0, 0.32)",
  onDarkLg: "0 24px 64px rgba(0, 49, 53, 0.40)",
} as const;

export const durations = {
  instant: 80,
  fast: 120,
  base: 240,
  slow: 480,
  cinema: 800,
  hero: 1200,
  epic: 1800,
} as const;

export const easings = {
  expo: "cubic-bezier(0.16, 1, 0.3, 1)",
  quart: "cubic-bezier(0.25, 1, 0.5, 1)",
  ioExpo: "cubic-bezier(0.87, 0, 0.13, 1)",
  ioQuart: "cubic-bezier(0.76, 0, 0.24, 1)",
  back: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  premium: "cubic-bezier(0.22, 1, 0.36, 1)",
  breathing: "cubic-bezier(0.4, 0, 0.6, 1)",
} as const;

/** Framer Motion-ready cubic-bezier arrays (destructured). */
export const easingArrays = {
  expo: [0.16, 1, 0.3, 1] as const,
  quart: [0.25, 1, 0.5, 1] as const,
  ioExpo: [0.87, 0, 0.13, 1] as const,
  ioQuart: [0.76, 0, 0.24, 1] as const,
  back: [0.34, 1.56, 0.64, 1] as const,
  premium: [0.22, 1, 0.36, 1] as const,
  breathing: [0.4, 0, 0.6, 1] as const,
} as const;

export const gradients = {
  dark: "linear-gradient(180deg, #003135 0%, #14222E 100%)",
  light: "linear-gradient(135deg, #003135 0%, #57EEA1 100%)",
  plus: "linear-gradient(135deg, #FF611D 0%, #4A6CFF 100%)",
} as const;

export type BrandColor = (typeof colors)[keyof typeof colors];
export type GrayScale = (typeof grays)[keyof typeof grays];
export type Spacing = (typeof spacing)[keyof typeof spacing];
export type Radius = (typeof radii)[keyof typeof radii];
export type Easing = (typeof easings)[keyof typeof easings];
export type Duration = (typeof durations)[keyof typeof durations];
