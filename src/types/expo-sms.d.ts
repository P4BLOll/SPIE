declare module 'expo-sms' {
  export interface SMSResponse {
    result: 'cancelled' | 'sent' | 'unknown';
  }

  export function isAvailableAsync(): Promise<boolean>;
  export function sendSMSAsync(
    addresses: string | string[],
    message: string,
    options?: { attachments?: any[] }
  ): Promise<SMSResponse>;
}
