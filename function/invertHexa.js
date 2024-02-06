function inverserOrdreOctets(hex) {
    // Vérifier si la chaîne hexadécimale a une longueur paire
    if (hex.length % 2 !== 0) {
        console.error("La chaîne hexadécimale doit avoir une longueur paire.");
        return null;
    }

    // Diviser la chaîne hexadécimale en paires d'octets
    const octets = hex.match(/.{1,2}/g);

    // Inverser l'ordre des octets
    const octetsInverses = octets.reverse();

    // Concaténer les octets inverses pour obtenir la nouvelle chaîne hexadécimale
    const hexInverse = octetsInverses.join("");

    return hexInverse;
}

module.exports = inverserOrdreOctets;