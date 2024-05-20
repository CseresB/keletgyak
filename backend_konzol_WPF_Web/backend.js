/* 1. feladat backend elkászítése
xampp - kapott adatbázis importálása
TERMINAL:
npm i -vel lefrissítjük az összes csomagot
npm audit fix
npm i nodemon - nodemon telepítése
package.json file-ban kiegészítjük
"scritpts":{
.
.
"start": "nodemon backend.js"
}
TERMINAL:
npm star-al indítjuk
*/



const express = require('express')
var cors = require('cors')
var mysql = require('mysql')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) //a 2. feladat postman teszteléséhez kell, hogy a form-ból érkező adatokat tudja kezelni
app.use(express.static('kepek'))


var connection
//1. feladat: Töltse ki megfelelően az adatbázishoz való csatlakozás adatait a backend.js fájlban.
function kapcsolat() {
  connection = mysql.createConnection({
    host: 'localhost', //vagy 127.0.0.1
    user: 'root', //root - az admin felhasználó
    password: '', //nincs hozzá alapértelmezetten jelszó
    database: 'kelettravel2024' //az importált adatbázis neve
  })

  connection.connect()
}
//le lehet tesztelni a /celok útvonalon, ahol lekéri az adatbázisból az adatokat
//vagy postman-ben le lehet kérdezni a /celok útvonal adatait

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/celok', (req, res) => {

  kapcsolat()
  connection.query('SELECT * from celok', function (err, rows, fields) {
    if (err) throw err

    console.log(rows)
    res.send(rows)
  })
  connection.end()
})

app.get('/kapcsolatok', (req, res) => {

  kapcsolat()
  connection.query('SELECT * from kapcsolatfelvetel', function (err, rows, fields) {
    if (err) throw err

    console.log(rows)
    res.send(rows)
  })
  connection.end()
})

//2. feladat: Készítsen végpontot az adatbázis kapcsolatfelvétel táblájának bővítésére
app.post('/kapcsolatok', (req, res) => { //ua. mint a function (req,res) {} (arrow nélkül)
  //3. feladat: A végpont kezelje a beérkező adatokat:
  //4. feladat: az összes bemenő adatot jól kezelje
  const { nev, email, telefon, megjegyzes } = req.body //kinyerjük az adatbázis mezőit (destruktálás)
  //console.log(nev, email, telefon, megjegyzes) //kilogoljuk, hogy sikeresen kinyertük e az adatokat
  /* 14. feladat: Tesztelje Postman-ban a kapcsolatfelvétel funkciót, készítsen az eredményességről képernyőképet!
  postman-ben tesztelés: POST: http://localhost:3000/kapcsolatok
  headers információ postman-ben Key: Content-Type, Value: application/json
  body: x-www-form-urlencoded: Key: a const ban megadott kulcsok, Value: a teszt adatok
  */

  kapcsolat();
  //adtabázis tábla/beszúrás/SQL előnézet és a backtick-et kiszedni '' helyére ? utána []-közé a const ban lévő értékek
  connection.query('INSERT INTO kapcsolatfelvetel (id, nev, email, telefon, megjegyzes) VALUES (NULL, ?, ?, ?, ?)', [nev, email, telefon, megjegyzes], (err, result) => {
    //5. feladat: és a kimenete hiba vagy sikeres felvitel legyen
    if (err) {
      return res.status(500).json('Hiba');
    }

    res.status(200).json('Sikeres felvitel!');
    connection.end();
  });
});


//6. feladat: új végpont létrehozása a "celok" táblán belüli kereséshez, (megadott kulcsszó alapján keressen az utazási célok nevében, részkifejezésekre, frontenden, Weblapon van keres úticélra )
app.post('/celok', (req, res) => {
  //7. feladat: A keresés végpont kezelje a beérkező adatokat:
  const searching = req.body.searching; //kinyerjük az adatot
  //console.log(searching) //kilogoljuk az adatot
  /*
  postman-ben tesztelés: POST: http://localhost:3000/celok
  headers információ postman-ben Key: Content-Type, Value: application/json
  body: x-www-form-urlencoded: Key: a const ban megadott searching, Value: a teszt adatok
  */

  kapcsolat()
  //8. feladat: jól keressen csak szórészletekre
  connection.query('SELECT * FROM celok WHERE celok_nev LIKE ?', [`%${searching}%`], (err, result) => {
    //9. feladat: és a kimenete a ralálr adatsor legyen
    if (err) {
      return res.status(500).json('Hiba')
    }

    res.status(200).json(result);
    connection.end();
  });
});

//10. feladat: Készítsen végpontot a kapcsolat tábla egy rekordjának törlésére
app.delete('/kapcsolatok/:id', (req, res) => {
  //11. feladat: a bemenő adat a törtlendő rekord id-ja legyen
  const id = req.params.id;
  //console.log(id); //kilogoljuk az id-t
  /*15. feladat: majd tesztelje a törlés funkciót, eredményességéről készüljön képernyőkép!
  postman-ben tesztelés: DELETE: http://localhost:3000/kapcsolatok/23
  headers és body nem kell. */

  kapcsolat()
  //12. feladat: a törlés parancsát jól alkalmazza
  connection.query('DELETE FROM kapcsolatfelvetel WHERE id = ?', [id], (err, result) => {
  //13. feladat: kimenet a Hiba vagy a Sikeres törlés legyen
    if (err) {
      return res.status(500).json("Hiba");
    }

    res.status(200).json("Sikeres törlés")
    connection.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})