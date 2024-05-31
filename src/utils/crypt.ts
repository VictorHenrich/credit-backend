import * as bcrypt from 'bcrypt';
import { InvalidPasswordError } from './exceptions';

export default class CryptUtils {
  private static salt: number = 10;

  static setSalt(value: number): void {
    CryptUtils.salt = value;
  }

  static getSalt(): number {
    return CryptUtils.salt;
  }

  static async createHash(value: string): Promise<string> {
    return await bcrypt.hash(value, CryptUtils.salt);
  }

  static async compareHash(data: string, encrypted: string): Promise<void> {
    const validation: boolean = await bcrypt.compare(data, encrypted);

    if (!validation) throw new InvalidPasswordError();
  }
}
