using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using NetworkHelper;

namespace KeletTravelKonzolos
{
    class Program
    {
        /* 20. feladat: Célok letárolása az adatbázis táblájából, listába, felhasználva a "Celok" osztályt (NewtonSoft.Json és NetworkHelper dll-ek beimportálása */
        //meg lesz adva a dll file. References-re jobb gomb/Add Reference/Browse és megkeressük a 2 dll-t és hozzáadjuk, majd using
        //host-nak megadjuk azt ahol a backend fut
        //ha rakunk egy breakpoint-ot a readkey()-hez, akkor futás közben, ha rámutatunk a celokList-ra az egérrel, fel kell dobnia a db tartalmát
        static string host = "http://localhost:3000";
        static List<Celok> celokLista = Backend.GET($"{host}/celok").Send().ToList<Celok>();
        static void Main(string[] args)
        {
            /* 21. feladat: Úticélok darabszámának kiírása (1. feladat) | celokLista.Count()-al megszámolja, hogy hány elem van a celokLista-ban */            
            Console.WriteLine($"1. feladat: Az elérhető célok databszáma: {celokLista.Count()}");

            /* 22. feladat: Azon úticélok kiiratása, amelyek nem kétszavasok, KetSzo függvény használata */
            //a linq-t használja, ahol a celokLista elemére a KetSzo metódus false-al tér vissza ott, beteszi egy listába
            Console.WriteLine($"2. feladat: Egyszavas célok: {celokLista.Count()}");
            celokLista.Where(x => x.KetSzo() == false).ToList().ForEach(x => Console.WriteLine(x.celok_nev));

            /* 23. feladat: Egy keresendő szó bekérése (3. feladat) */
            Console.Write("3. feladat: Adj meg egy keresendő szót: ");
            string keresendo = Console.ReadLine();

            /* 24. feladat: majd a keresett szó megkeresése az úti cél nevében, cél nevének és a hónap kiírása, amikor legtöbb kultúrális esemény zajlik,*/
            var talalat = celokLista.Where(x => x.celok_nev.Contains(keresendo)).Select(x => $"{ x.celok_nev} {x.celok_kultura_honap}").ToList();

            Console.WriteLine("Találatok: ");
            talalat.ForEach(x => Console.WriteLine(x));
            /* 25. feladat: találatok számának is kiírása képernyőre, */
            Console.WriteLine($"Találatok száma: {talalat.Count()}");

            /* 26. feladat: a keresés eredménye fájlba is legyen kiírva, fájl neve a bekért szó pl. sziget.txt fájlba, */
            /* 27. feladat: ugyanaz legyen fjlban, mint a képernyőn: a talált úticélok neve (hónap) és alatta a találatok száma. */
            // using system.IO; importálni kell, hogy tudjunk file-ba írni és olvasni
            var tartalom = talalat.Prepend("Találatok: ").Append($"Találatok száma: {talalat.Count()}");
            File.WriteAllLines($"{keresendo}.txt", tartalom);

            /* 28. feladat: A kultúra hónapja szerinti csoportosításban hány (darab) úti cél van (4. feladat),*/

            Console.WriteLine("4. feladat: ");
            celokLista.GroupBy(x => x.celok_kultura_honap)
                .Select(x => new
                { honap = x.Key,
                db=x.Count()
                }).OrderByDescending(x => x.db).ToList().ForEach(x => Console.WriteLine($"{x.honap} : {x.db}"));
            /* 29. feladat: rendezés darabszám szerint csökkenően,*/
            /* 30. feladat: majd hónap és darabszám kiírása képernyőre.*/


            Console.ReadKey();
        }
    }
}
