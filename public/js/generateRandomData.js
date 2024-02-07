/**
 * Generate random data for a weather station.
 *
 * @param {Date} startDate - The start date of the data generation.
 * @param {Date} endDate - The end date of the data generation.
 * @returns {Object[]} The generated data.
 */
const generateRandomData = (startDate, endDate) => {
    const data = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        let dates = [];
        let random = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < random; i++) {
            const temperature = Math.random() * (30 - 10) + 10; // Température aléatoire entre 10 et 30 degrés
            const humidity = Math.floor(Math.random() * (80 - 40 + 1) + 40); // Taux d'humidité aléatoire entre 40 et 80%

            dates.push({
                date: new Date(date.getTime() + i * (3600 * 6) * 1000).getTime(),
                temperature: parseFloat(temperature.toFixed(2)),
                humidity: humidity
            });
        }
        dates.sort((a, b) => a.date - b.date);
        data.push(...dates);
    }
    return data;
};