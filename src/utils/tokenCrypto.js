import { Buffer } from 'buffer';

async function encrypt(value) {
    const bufferSource = new TextEncoder().encode('gittop');

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const algorithm = { name: 'AES-GCM', iv: iv };

    const key = await crypto.subtle.importKey(
        'raw',
        await crypto.subtle.digest('SHA-256', bufferSource),
        algorithm,
        false,
        ['encrypt']
    );

    const text = new TextEncoder().encode(value);
    const encrypted = await crypto.subtle.encrypt(
        algorithm,
        key,
        text
    );
    const encryptedArr = Array.from(new Uint8Array(encrypted));
    
    const ivStr = Array.from(iv).map(b => String.fromCharCode(b)).join('');
    const encryptedStr = encryptedArr.map(byte => String.fromCharCode(byte)).join('');

    return base64ToBase64Url(Buffer.from(ivStr+encryptedStr).toString('base64'));
}

async function decrypt(value) {
    const bufferSource = new TextEncoder().encode('gittop');

    const base64Encoded = base64UrlToBase64(value);
    const decoded = Buffer.from(base64Encoded, 'base64').toString();

    const ivStr = decoded.slice(0,12);
    const iv = new Uint8Array(Array.from(ivStr).map(ch => ch.charCodeAt(0)));

    const algorithm = { name: 'AES-GCM', iv: iv };

    const key = await crypto.subtle.importKey(
        'raw',
        await crypto.subtle.digest('SHA-256', bufferSource),
        algorithm,
        false,
        ['decrypt']
    );

    const decodedDataBuffer = decoded.slice(12);
    const data = new Uint8Array(Array.from(decodedDataBuffer).map(ch => ch.charCodeAt(0)));

    try {
        const decrypted = await crypto.subtle.decrypt(algorithm, key, data);
        return new TextDecoder().decode(decrypted);
    } catch(e) {
        console.log(e);
    }
    
}

function base64UrlToBase64(base64url) {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/').padEnd(base64url.length + (4 - base64url.length % 4) % 4, '=');
    return base64;
}

function base64ToBase64Url(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export {encrypt, decrypt};