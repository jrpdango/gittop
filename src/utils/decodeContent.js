import { Buffer } from 'buffer';

export function decodeContent(base64Encoded) {
    const content = Buffer.from(base64Encoded, 'base64');
    return content.toString();
}