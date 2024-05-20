using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeletTravelKonzolos
{
    /* 16. feladat: Osztály létrehozása "célok" tábla összes mezőjére (karakterhelyesen) */
    //Publickra tesszük az osztályt, hogy más projekt is el tudja érni (grafikus)
    public class Celok
    {
        //prop szó és 2x tab, majd névnek pontosan azt adjuk meg ami az adatbázisban is szerepel
        public int celok_id { get; set; }
        //varchar = string
        public string celok_nev { get; set; }
        public string celok_kep { get; set; }
        public string celok_kultura_honap { get; set; }
        public int celok_orszag { get; set; }

        /* 18.feladat: "Celok" osztály bővítése új METÓDUSSAL (KetSzo néven), melynek visszatérési értéke igaz logikai érték, ha a cél neve két szóból áll, egyébként hamis */
        //public és a visszatérési érték
        public bool KetSzo()
        {/*
            1. megoldás
            //string tipusu tömb létrehozása tmp néven, ahol a celok_nev-et felosztjuk a zárójelben lévő karakterek szerint (szóköz ha nincs semmi a zárójelben)
            string[] tmp = celok_nev.Split();
            //ha a tmp tömb hossza egyenlő 2, akkor true, egyébként false értéket ad vissza
            if (tmp.Length == 2)
            {
                return true;                
            }else
            {
                return false;
            }*/

            //2. megoldás
            //visszatér igaz értékkel ha a celok_nev tartalmaz egy szóközt, tehát 2 szóból áll
            return celok_nev.Contains(" ");

        }    
    }
}
