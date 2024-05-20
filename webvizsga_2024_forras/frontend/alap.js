/* 54. feladat: Oldja meg, hogy a 'célok' megjelenjenek a Weblap 'Úti célok'
szekciójában, a Backend végpont megfelelő hívásával, */
//a body-ba onload="uticelok", hogy az oldal betöltésekor mindenképp fusson le ez a function
async function uticelok() {
    const res = await fetch("http://localhost:3000/celok");
    /* 55. feladat: a visszatérő adatokat-úticélokat, json-ban kezelje, rakja keretekbe, | keret: div-be kell majd rakni*/
    const celok = await res.json();

    //console.log(celok);

    let celokHTML = "";

    for (const cel of celok)
        /* 56. feladat: a keretek oszálya "col-lg-4" és "ml-auto" osztályok legyenek, */
        /* 57. feladat: a keretbe a képet helyezze el (jó eléréssel, reszponzív képméretezéssel), | img-fluid reszponzív*/
        /* 58. feladat: a keretbe illesszen bekezdést, mely osztálya "alairas", legyen benne a cél neve */
        /* 59. feladat: és a célok képei, illetve a célok nevei, a megfelelő helyen jelenjenek meg a Weblapon, "celok" azonosítójú keretben, a minta szerint. */
        celokHTML += `
    <div class="col-lg-4 ml-auto">
        <img src="http://localhost:3000/${cel.celok_kep}" alt="${cel.celok_nev}" class="img-fluid"> 
        <p class="alairas">${cel.celok_nev}</p>
    </div>`

    document.getElementById("celok").innerHTML = celokHTML;

}

function kapcsolat() {
    /* 51. feladat: Oldja meg, hogy a kapcsolatfelvétel szekcióban "Úti cél vagy egyéb megjegyzés"
    részbe írt szöveg bekerüljön az adatbázisba, ehhez a "kapcsolat" függvényt módosítsa az alap.js-ben */

    //átírtuk a neveket
    var bemenet = {
        nev: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telefon: document.getElementById("phone").value,
        megjegyzes: document.getElementById("message").value
    }

    /* 52. feladat: továbbá, a fetch parancsban a method és body mezőt megfelelően állítsa be, */

    //a backend-hez igazítjuk és átírjuk a megfelelő útvonalra
    fetch("http://localhost:3000/kapcsolatok", {
        //post method (a backendből meg lehet nézni)
        method: "POST",
        //át kell alakítani JSON.stringify-al
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }

        /* 53. feladat: és a "siker" azonosítójú keretbe írja a Backendről visszatérési értékként megkapott "A felvétel sikerült szöveget" */
    )
        .then(x => x.text())
        .then(y => {
            //alert(y);

            //az y-ban van eltárolva a backend-ben megadott felirat sikeres rögzítés esetén
            document.getElementById("siker").innerHTML = y;
        });
}

/* 60. feladat: Oldja meg, hogy a Keresés szekcióban lehessen keresni az úti cél nevében, ehhez hozzon létre "kereses" függvényt, 
mely a keresésre írt Backend végpotot hívja meg */
async function kereses() {
    /* 61. feladat: a "keresendo" azonosítójú beviteli mezőbe írt szöveget átküldi a Backend végpontnak, */
    const searching = document.getElementById("keresendo").value;

    const res = await fetch("http://localhost:3000/celok", {
        method: 'POST',
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({searching})
    });
    
    const adatok = await res.json();
    console.log(adatok)

    /* 62. feladat: és a keresés eredményét, számozatlan felsorolába helyezi, */
    let keresesHTML = "<ul>";
    for (const adat of adatok){
        /* 63. feladat: minden listaelemre beállítja a "lista" osztályt, berakja a 100px szélességű képet és */
        /* 64. feladat: a "kephez" osztályú szöveges mezőbe rakja az úticél nevét, */
        keresesHTML += `
        <li class="lista">
            <img src="http://localhost:3000/${adat.celok_kep}" alt="${adat.celok_nev}" style="width: 100px;">
            <span class="kephez"> ${adat.celok_nev} </span>
        </li>        
        `        
    }
    keresesHTML += "</ul>"
    /* 65. feladat: és a keresés eredménye megjelenik a Weblapon a "talalat" szonosítójő keretben, a minta szerint */
    document.getElementById("talalat").innerHTML = keresesHTML;
}


// /* 60. feladat: Oldja meg, hogy a Keresés szekcióban lehessen keresni az úti cél nevében, ehhez hozzon létre "kereses" függvényt, 
// mely a keresésre írt Backend végpotot hívja meg */
// function kereses() {
//     /* 61. feladat: a "keresendo" azonosítójú beviteli mezőbe írt szöveget átküldi a Backend végpüontnak, */
//     const searching = document.getElementById("keresendo").value
//     //console.log(searching);

//     fetch("http://localhost:3000/celok", {
//         method: "POST",
//         headers: {
//             "content-type": "application/json; charset=UTF-8"
//         },
//         body: JSON.stringify({ searching })
//     })
//         .then(x => x.json())
//         .then(adatok => {
//             console.log(adatok)
//             /* 62. feladat: és a keresés eredményét, számozatlan felsorolába helyezi, */
//             /* 64. feladat: a "kephez" osztályú szöveges mezőbe rakja az úticél nevét, */
//             let keresesHTML = "<ul>";
//             for (const adat of adatok) {
//                 keresesHTML += `
//                 <li class="lista">
//                     <img src="http://localhost:3000/${adat.celok_kep}" alt="${adat.celok_nev}" style="width: 100px">
//                     <span class="kephez">${adat.celok_nev}</span>
//                 </li>`
//             }
//             keresesHTML+= "</ul>"
//             /* 65. feladat: és a keresés eredménye megjelenik a Weblapon a "talalat" szonosítójő keretben, a minta szerint */
//             document.getElementById("talalat").innerHTML = keresesHTML;
//         })

// }



var counter = 0;
szamlaloStart();

function szamlaloStart() {
    setInterval(() => {
        counter++;
        var szamlaloSzoveg = document.getElementById('szamlalo');
        szamlaloSzoveg.textContent = counter;
    },
        500, window
    );
}


