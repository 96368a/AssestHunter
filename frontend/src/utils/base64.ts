
function toBinary(string: string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = string.charCodeAt(i);
    }
    const charCodes = new Uint8Array(codeUnits.buffer);
    let result = "";
    for (let i = 0; i < charCodes.byteLength; i++) {
        result += String.fromCharCode(charCodes[i]);
    }
    return result;
}

function fromBinary(binary) {
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    const charCodes = new Uint16Array(bytes.buffer);
    let result = "";
    for (let i = 0; i < charCodes.length; i++) {
        result += String.fromCharCode(charCodes[i]);
    }
    return result;
}

export function base64Encode(str: string): string {
    return btoa(toBinary(str))
}

export function base64Decode(str: string): string {
    return fromBinary(atob(str))
}

