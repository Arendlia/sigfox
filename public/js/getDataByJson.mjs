//import convertTimestampToDatetime from "../../Function/convertDate.js";
//import convertHexaTojson from "../../Function/convertHexaTojson.js";

function convertTimestampToDatetime(timestamp) {
    let date = new Date(timestamp);
    const result = date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
    return result;
}

function convertDateAndHexa(timestamp, value) {
    const result = convertTimestampToDatetime(timestamp);
    // Convert hexa
    const hexaT = parseInt(value.slice(0, 4), 16);
    const hexaH = parseInt(value.slice(4, 6), 16);
    const hexaB = parseInt(value.slice(6, 8), 16);
    const hexaString = hexaT.toString();
    const t = hexaString.slice(0, 4);

    const tabData = {'d': result ,'t': parseInt(t) / 100, 'h': hexaH, 'b': hexaB/150 * 100 };
    return tabData;
}


document.addEventListener('DOMContentLoaded', function () {
    const tabNewData = [];

    const tbody = document.getElementById('tbody');
    // Utilisation de la méthode fetch pour récupérer les derniers éléments
    fetch('/js/messages.json')
        .then(response => response.json())
        .then(derniersElements => {
            // Traiter les données reçues et les afficher
            derniersElements.forEach(element => {
                tabNewData.push(convertDateAndHexa(element.time, element.data))
            });
            console.log(tabNewData);
            tabNewData.forEach((test, index) => {
                const tr = document.createElement('tr');
                const divD = document.createElement('td');
                const divT = document.createElement('td');  
                const divH = document.createElement('td');
                const divB = document.createElement('td');
                divD.textContent = test['d'];
                divT.textContent = test['t'];
                divH.textContent = test['h'] + ' %';
                divB.textContent = test['b'];

                tr.append(divD,divT, divH, divB);
                tbody.appendChild(tr);
            })
        })
        .catch(error => {
            console.error('Erreur lors de la requête AJAX:', error);
        });
    console.log(tabNewData);
   
});