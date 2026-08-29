async function generatePinHash(pin) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin.toString());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    console.log(`%c PIN: ${pin}`, 'color: #3b82f6; font-weight: bold;');
    console.log(`%c HASH: ${hashHex}`, 'color: #10b981; font-weight: bold;');
    return hashHex;
}


async function encryptPayload(plainText, secretPin) {
    const enc = new TextEncoder();

    // Derive AES key from PIN
    const keyBuffer = await crypto.subtle.digest('SHA-256', enc.encode(secretPin.toString()));
    const key = await crypto.subtle.importKey('raw', keyBuffer, 'AES-GCM', false, ['encrypt']);

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        enc.encode(plainText)
    );

    const bufferToBase64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));

    const payload = JSON.stringify({
        iv: bufferToBase64(iv),
        data: bufferToBase64(encrypted)
    });

    console.log("%c Encrypted Payload Result:", "color: #10b981; font-weight: bold;");
    console.log(`'${payload}'`);

    return payload;
}



generatePinHash("120498");
encryptPayload(`Kuru Toga Switch Alpha Gel`, "772026");