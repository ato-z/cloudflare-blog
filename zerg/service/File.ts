export class ServiceFile {
  /**
   * 传入一个base64字符串返回一个Uint8Array
   */
  static base64ToUint8Array(base64: string) {
    const [, right] = base64.split(',');
    const binary_string = atob(right);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
}
