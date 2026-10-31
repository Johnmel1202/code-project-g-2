
export function validateEmail(email: string): string | null {
  const normalizedEmail = email.trim().toLowerCase();

  // Accepts common email providers, including Gmail.
  const emailRegex =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!normalizedEmail) {
    return "Email is required.";
  }

  if (
    normalizedEmail.length > 254 ||
    !emailRegex.test(normalizedEmail)
  ) {
    return "Please enter a valid email address.";
  }

  return null;
}

export function validateFullName(fullName: string): string | null {
  const normalizedName = fullName.trim();

  if (
    normalizedName.length < 2 ||
    !/^[A-Za-zÀ-ÿ\s]+$/.test(normalizedName)
  ) {
    return "Full Name should contain letters and spaces only.";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    return "Password must be 8+ characters with uppercase, lowercase, number, and special character.";
  }

  return null;
}
