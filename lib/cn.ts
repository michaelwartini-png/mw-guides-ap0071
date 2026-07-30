/**
 * Joins class names, filtering out falsy values.
 * Kept dependency-free (no clsx/tailwind-merge) per AP-000.1's
 * "no unnecessary libraries" rule. Revisit if class conflicts appear.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
