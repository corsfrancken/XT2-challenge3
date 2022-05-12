var advies = [];
advies[0] = "Laat je niet kisten.";
advies[1] = "Houd altijd een boom tussen jou en een beer.";
advies[2] = "Gas is erg duur geworden.";
advies[3] = "Elk nadeel heb z'n voordeel.";
advies[4] = "Als je niet ken winnen, moet je zorgen dat je niet verliest.";
advies[5] = "Vaak moet er iets gebeuren voordat er iets gebeurt.";
advies[6] = "Waardeer wat je hebt.";
advies[7] = "Geef niet op.";
advies[8] = "Een dag niet gelachen is een dag niet geleefd.";
advies[9] = "Haal geen oude koeien uit de sloot.";
advies[10] = "Pak wat je pakken kan.";

function adviesGeven() {
    var geefAdvies = Math.floor(Math.random()*(11));
    document.getElementById("results").innerHTML = advies[geefAdvies];
}


