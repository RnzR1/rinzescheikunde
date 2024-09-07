document.getElementById('calculateButton').addEventListener('click', function() {
    // Haal de invoerwaarden op
    const trainDistance = parseFloat(document.getElementById('trainDistance').value);
    const trainFactor = parseFloat(document.getElementById('trainFactor').value);
    const carDistance = parseFloat(document.getElementById('carDistance').value);
    const carFactor = parseFloat(document.getElementById('carFactor').value);
    const planeDistance = parseFloat(document.getElementById('planeDistance').value);
    const planeFactor = parseFloat(document.getElementById('planeFactor').value);
    const boatDistance = parseFloat(document.getElementById('boatDistance').value);
    const boatFactor = parseFloat(document.getElementById('boatFactor').value);

    // Controleer of de waarden geldig zijn
    if (isNaN(trainDistance) || isNaN(trainFactor) ||
        isNaN(carDistance) || isNaN(carFactor) ||
        isNaN(planeDistance) || isNaN(planeFactor) ||
        isNaN(boatDistance) || isNaN(boatFactor)) {
        alert("Voer alstublieft geldige getallen in.");
        return;
    }

    function calculateCO2Emission(distance, factor) {
        return distance * factor;
    }

    function kgToMol(kgCO2) {
        const molarMassCO2 = 44; // g/mol
        return (kgCO2 * 1000) / molarMassCO2;
    }

    function printDetails(transport, distance, factor) {
        const kgCO2 = calculateCO2Emission(distance, factor);
        const molCO2 = kgToMol(kgCO2);
        return `<h3>${transport.charAt(0).toUpperCase() + transport.slice(1)}:</h3>
                <p>Afstand: ${distance} km</p>
                <p>CO2-uitstoot: ${kgCO2.toFixed(2)} kg CO2</p>
                <p>CO2-uitstoot: ${molCO2.toFixed(2)} mol CO2</p>
                <p><strong>Berekening:</strong></p>
                <p>CO2-uitstoot (kg) = Afstand (km) * Emissiefactor (kg CO2/km)</p>
                <p>${kgCO2.toFixed(2)} kg = ${distance} km * ${factor.toFixed(3)} kg CO2/km</p>
                <p>CO2-uitstoot (mol) = CO2-uitstoot (kg) * 1000 / Molaire massa CO2 (g/mol)</p>
                <p>${molCO2.toFixed(2)} mol = ${kgCO2.toFixed(2)} kg * 1000 / 44 g/mol</p>`;
    }

    const trainResults = printDetails('trein', trainDistance, trainFactor);
    const carResults = printDetails('auto', carDistance, carFactor);
    const planeResults = printDetails('vliegtuig', planeDistance, planeFactor);
    const boatResults = printDetails('boot', boatDistance, boatFactor);

    const totalKgCO2 = [trainDistance * trainFactor, carDistance * carFactor, planeDistance * planeFactor, boatDistance * boatFactor].reduce((a, b) => a + b);
    const totalMolCO2 = kgToMol(totalKgCO2);

    document.getElementById('detailedResults').innerHTML = `${trainResults} ${carResults} ${planeResults} ${boatResults}`;
    document.getElementById('totalResults').innerHTML = `<h2>Totaal:</h2>
                                                         <p>Totale CO2-uitstoot: ${totalKgCO2.toFixed(2)} kg CO2</p>
                                                         <p>Totale CO2-uitstoot: ${totalMolCO2.toFixed(2)} mol CO2</p>`;
    document.getElementById('results').classList.remove('hidden');
});
