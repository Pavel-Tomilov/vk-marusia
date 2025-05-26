export function getInitials(name: string, surname: string): string {
  const trimmedName = name.trim();
  const trimmedSurname = surname.trim();

  const initials =
    (trimmedName[0]?.toUpperCase() || "") +
    (trimmedSurname[0]?.toUpperCase() || "");

  return initials;
}
