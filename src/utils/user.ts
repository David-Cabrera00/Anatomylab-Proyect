export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  isLocal?: boolean;
};

/**
 * Computes up to 2 uppercase initials from a user's name or email.
 * - Single word name: "María" -> "M"
 * - Two or more words: "Usuario Prueba" -> "UP", "David Andrés Cabrera" -> "DC"
 * - Fallback to email prefix or default "AL"
 */
export function getUserInitials(name?: string | null, email?: string | null): string {
  const cleanName = name?.trim();
  if (cleanName) {
    const words = cleanName.split(/\s+/).filter(Boolean);
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    if (words.length >= 2) {
      const first = words[0].charAt(0);
      const last = words[words.length - 1].charAt(0);
      return `${first}${last}`.toUpperCase();
    }
  }

  const cleanEmail = email?.trim();
  if (cleanEmail) {
    const prefix = cleanEmail.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
    if (prefix.length >= 2) {
      return prefix.slice(0, 2).toUpperCase();
    }
    if (prefix.length === 1) {
      return prefix.toUpperCase();
    }
  }

  return "AL";
}
