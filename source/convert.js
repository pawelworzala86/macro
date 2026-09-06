function parseIntToHex(value, bytes) {
    const b = BigInt(bytes);
    const mask = (1n << (8n * b)) - 1n;
    let v = BigInt(value);
    // two's complement — działa dla minusów automatycznie
    v &= mask;
    return v.toString(16).padStart(bytes * 2, "0").toUpperCase();
}

function parseUnsignedToHex(value, bytes) {
    value = value.replace('u','')
    const b = BigInt(bytes);
    const mask = (1n << (8n * b)) - 1n;
    // wymuszenie zakresu unsigned
    const v = BigInt(value) & mask;
    return v.toString(16).padStart(bytes * 2, "0").toUpperCase();
}

function parseFloatToHex(value, bytes) {
    value = value.replace('f','')
    const buffer = new ArrayBuffer(bytes);
    const view = new DataView(buffer);
    if (bytes === 4) {
        view.setFloat32(0, value, false); // big-endian
    } else if (bytes === 8) {
        view.setFloat64(0, value, false); // big-endian
    } else {
        throw new Error("Float must be 4 or 8 bytes");
    }
    let hex = "";
    for (let i = 0; i < bytes; i++) {
        hex += view.getUint8(i).toString(16).padStart(2, "0");
    }
    return hex.toUpperCase();
}

function hexToLE(hex) {
    // usuń ewentualne "0x"
    hex = hex.replace(/^0x/, "").toLowerCase();
    // dopaduj do pełnych bajtów (parzysta liczba znaków)
    if (hex.length % 2 !== 0) {
        hex = "0" + hex;
    }
    // rozbij na bajty
    const bytes = hex.match(/.{2}/g);
    // odwróć kolejność bajtów → LE
    return bytes.reverse().join("");
}

module.exports = {
    parseIntToHex,
    parseUnsignedToHex,
    parseFloatToHex,
    hexToLE
}