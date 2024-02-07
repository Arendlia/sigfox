/**
 * Inverse the order of the bytes in a hex string
 * @param {string} hex - the hex string to reverse
 * @returns {string} the reversed hex string
 */
function inverserOrdreOctets(hex) {
  if (hex.length % 2 !== 0) {
    // Throw an error if the hex string is not an even length
    throw new Error("La chaîne hexadécimale doit avoir une longueur paire.");
  }

  const octets = hex.match(/.{1,2}/g); // Split the hex string into pairs of characters

  const octetsInverses = octets.reverse(); // Reverse the order of the characters in each pair

  const hexInverse = octetsInverses.join(""); // Join the characters back into a hex string

  return hexInverse;
}

module.exports = inverserOrdreOctets;