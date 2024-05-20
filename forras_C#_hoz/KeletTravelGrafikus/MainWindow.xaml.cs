using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using NetworkHelper;
using KeletTravelKonzolos;

/* 31. feladat: A projekten belül új WPF megnyitása, és Consolos program elérése, 
 * minden class nyivánossá tétele (Newtonsoft.Json és NetworkHelper dll-ek importálása) */
//References jobb gomb és kiválasztjuk a Newtonsoft és networkhelper-t, majd using NetworkHelper;
//KeletTravelGrafikus jobb gomb és add / existing item, majd link ként (Add as link) hozzáadjuk a Celok.cs-t és a kapcsolatfelvetel.cs-t
//using KeletTravelKonzolos, hogy tudjuk is használni hozzáadott file-okat


namespace KeletTravelGrafikus
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        /* 32. feladat: Tabcontrol 1. fülén belül Listbox-ban jelenjenek meg az úticélok nevei */
        //stringként el kell tárolni a localhotot

        string host = "http://localhost:3000";
        public MainWindow()
        {
            InitializeComponent();
            /* 33. feladat: hívja meg hozzá a szükséges Backend végpontot, */
            //a listbox elemi forrásának megadjuk a backend útvonalat amit átadunk egy listának aminek a típusa a Celok osztály lesz
            lbCelok.ItemsSource = Backend.GET($"{host}/celok").Send().ToList<Celok>();
            //külön meg kell adni, hogy a celok osztály melyik mezőjét akarjuk
            lbCelok.DisplayMemberPath = "celok_nev";
        }
        /* 34. feladat:  ha a listbox elemeire kattintunk,*/
        //új esemény létrehozása, dupla katt a listbox-ra (ha rosszra kattintottunk, akkor xaml-ből is ki kell törölni különben hibát dob
        private void lbCelok_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            /* 35. feladat: mellette jelenjen meg az úticél neve és látogatáshoz ideális hónap. */
            //cel objektum létrehozása ami megkapja mindent tulajdonságát a selected item-nek
            Celok cel = lbCelok.SelectedItem as Celok;
            //a CelNev kontentje legyen a cel objektum celok_nev értékével
            lblCelNev.Content = cel.celok_nev;
            lblCelHonap.Content = cel.celok_kultura_honap;
        }

        /* 36. feladat: A Tabcontrol 2. fülén készítsen kapcsolatfelvételhez űrlapot, */
        //xaml-ben megírva

        /* 38. feladat: a felitelt, a szükséges Backend végpont hívásával oldja meg, */
        /* 39. feladat: minden szükséges adatot küldjön át a végpontnak, */
        /* 40. feladat: ha a név mező üres, ne vigyen fel adatot, hibaüzenetet adjon. */

        /* 37. feladat: gombnyomásra vigye fel az adatokat az adatbázis kapcsolatfelvetel táblájába */
        //Kapcsolatfelvétel gombra dupla katt-al létrehozza a click eseményt
        private void btnFelvetel_Click(object sender, RoutedEventArgs e)
        {
            Kapcsolatfelvetel adatok = new Kapcsolatfelvetel()
            {
                nev = tbNev.Text,
                email = tbEmail.Text,
                telefon = tbTelefon.Text,
                megjegyzes = tbMegjegyzes.Text
            };

            if (adatok.Hianyos)
            {
                MessageBox.Show("Hiba! Minden mezőt tölts ki!");
            }
            else
            {
                string uzenet = Backend.POST($"{host}/kapcsolatok").Body(adatok).Send().Message;
                MessageBox.Show(uzenet);
            }

        }        
    }
}
