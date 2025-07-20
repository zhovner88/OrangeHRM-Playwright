export class TestHelpers {
  /**
   * Generates a random string of specified length
   * @param length - Length of the random string (default: 8)
   * @returns Random string
   */
  static generateRandomString(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generates a timestamp-based unique string
   * @param prefix - Prefix for the string (default: 'Test')
   * @returns Timestamped string
   */
  static generateTimestampedString(prefix: string = 'Test'): string {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${prefix} ${timestamp} ${randomSuffix}`;
  }

  /**
   * Generates a simple UUID-like string
   * @returns UUID-like string
   */
  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Generates a unique job title with random suffix
   * @param baseTitle - Base title for the job (default: 'Test Engineer')
   * @param useTimestamp - Whether to use timestamp instead of random string (default: false)
   * @returns Unique job title
   */
  static generateUniqueJobTitle(baseTitle: string = 'Test Engineer', useTimestamp: boolean = false): string {
    if (useTimestamp) {
      return this.generateTimestampedString(baseTitle);
    }
    const randomSuffix = this.generateRandomString(6);
    return `${baseTitle} ${randomSuffix}`;
  }

  /**
   * Generates a unique work shift name with random suffix
   * @param baseName - Base name for the work shift (default: 'Day Shift')
   * @param useTimestamp - Whether to use timestamp instead of random string (default: false)
   * @returns Unique work shift name
   */
  static generateUniqueWorkShiftName(baseName: string = 'Day Shift', useTimestamp: boolean = false): string {
    if (useTimestamp) {
      return this.generateTimestampedString(baseName);
    }
    const randomSuffix = this.generateRandomString(6);
    return `${baseName} ${randomSuffix}`;
  }

  /**
   * Generates a unique username with random suffix
   * @param baseUsername - Base username (default: 'testuser')
   * @param useTimestamp - Whether to use timestamp instead of random string (default: false)
   * @returns Unique username
   */
  static generateUniqueUsername(baseUsername: string = 'testuser', useTimestamp: boolean = false): string {
    if (useTimestamp) {
      return this.generateTimestampedString(baseUsername);
    }
    const randomSuffix = this.generateRandomString(6);
    return `${baseUsername}${randomSuffix}`;
  }

  /**
   * Generates a unique email with random suffix
   * @param baseEmail - Base email (default: 'test@example.com')
   * @param useTimestamp - Whether to use timestamp instead of random string (default: false)
   * @returns Unique email
   */
  static generateUniqueEmail(baseEmail: string = 'test@example.com', useTimestamp: boolean = false): string {
    const [localPart, domain] = baseEmail.split('@');
    if (useTimestamp) {
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 6);
      return `${localPart}${timestamp}${randomSuffix}@${domain}`;
    }
    const randomSuffix = this.generateRandomString(6);
    return `${localPart}${randomSuffix}@${domain}`;
  }

  /**
   * Waits for a specified amount of time (useful for debugging)
   * @param milliseconds - Time to wait in milliseconds
   */
  static async wait(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Formats current date and time for logging
   * @returns Formatted date string
   */
  static getCurrentTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }
} 