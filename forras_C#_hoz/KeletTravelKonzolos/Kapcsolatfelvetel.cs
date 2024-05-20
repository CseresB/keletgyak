using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeletTravelKonzolos
{
    /* 17. feladat: Osztály létrehozása a "kapcsolatfelvétel" tábla összes mezőjére (karakterhelyesen) */
    public class Kapcsolatfelvetel
    {

        //prop szó és 2x tab, majd névnek pontosan azt adjuk meg ami az adatbázisban is szerepel
        //varchar = string
        //text = string
        public int id { get; set; }
        public string nev { get; set; }
        public string email { get; set; }
        public string telefon { get; set; }
        public string megjegyzes { get; set; }

        /* 19. feladat: "Kapcsolat" osztály bővítése új TULAJDONSÁGGAL (property) (Hianyos néven), mely értéke igaz logikai érték, ha a név, email vagy telefony bármelyike üres, egyébként hamis */
        public bool Hianyos
        {
            get
            {
                if (nev == "" || email == "" || telefon=="")
                {
                    return true;
                }else {
                    return false; 
                }

            }
        }
    }   
}
