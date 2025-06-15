export function isAnyKeyTruthy(obj: Record<string, unknown>): boolean {
  for (const k in obj) if (obj[k]) return true;
  return false;
}

export const hasObjectKeys = <T extends object>(
  obj: T | null | undefined
): boolean => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false;
  }
  return Object.keys(obj).length > 0;
};

export function removeEmptyValues(obj: object) {
  if (typeof obj !== 'object' || obj === null) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !!value)
  );
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function snakeToTitleCase(str: string): string {
  if (!str) return str;
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function toTitleCaseFromUnderscore(input: string): string {
  return input
    .split('_')
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
