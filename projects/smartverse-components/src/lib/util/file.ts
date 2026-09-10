export function generateUUIDv4(): string {
  return globalThis.crypto?.randomUUID?.() ?? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, value => {
    const random = Math.floor(Math.random() * 16);
    return (value === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}
export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64.split(',')[1] ?? '');
  return Uint8Array.from(binary, character => character.charCodeAt(0)).buffer;
}
