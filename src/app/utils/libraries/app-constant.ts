// Auth constants
export abstract class Auth {
  static readonly SIGN_IN: string = 'sign-in';
  static readonly SIGN_UP: string = 'sign-up';
}

// Validation messages
export abstract class ValidationMessages {
  static readonly REQUIRED: string = 'This field is required.';
  static readonly PATTERN: string = 'The format is invalid.';
  static readonly MIN_LENGTH: string = 'This field must be at least 6 characters long.';
  static readonly MAX_LENGTH: string = 'This field must be at least 10 characters long.';
  static readonly EMAIL: string = 'Please enter a valid email.';
  static readonly EMAIL_NOT_EXIST: string = 'The email entered does not exist.';
  static readonly DATA_INVALID: string = 'The provided data is invalid.';
  static readonly EMAIL_IN_USE: string = 'This email is already in use.';
}

// Regex patterns
export abstract class RegexPatterns {
  static readonly EMAIL: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
}

// LocalStorage keys
export abstract class LocalStorageKeys {
  static readonly TOKEN: string = 'token';
  static readonly REFRESH_TOKEN: string = 'refresh-token';
  static readonly CURRENT_USER: string = 'current-user';
}

// Status actions
export abstract class StatusActions {
  static readonly UPDATE: string = 'update';
  static readonly CREATE: string = 'create';
}
