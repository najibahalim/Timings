import { Component, OnInit } from '@angular/core';
import { Http} from '@angular/http';
import { AlertController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Geolocation } from "@ionic-native/geolocation/ngx";


@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {

  pdate=new Date();
  sunrise="ss";
  sunset="ss";
  sunsetY = "ss";
  sunriseT = "ss";
  noon;start7;end8;
  zuhrs; zuhre; fajrs; fajre; ishas; ishae; maghribs; maghribe; asrs; asre;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  datetoday = this.pdate.toLocaleDateString('en-US', this.options);
  constructor(private http: Http, private alctrl: AlertController, private router: Router, private storage: Storage,private geolocation:Geolocation)  {
  }
 
  location="---";
  ngOnInit() {
    this.storage
      .get("data")
      .then((d) => {
        console.log("Data Came");
        console.log(d);
        this.sunrise=d.sunrise;
        this.sunset=d.sunset;
        this.sunsetY=d.sunsetY;
        this.sunriseT=d.sunriseT;
        this.calcTime();
        this.datetoday="Manual";
        this.location="---"
        this.storage.clear();


      })
      .catch(() => {
        console.log("Data didnt come");
        const k = new Date(this.pdate);

        this.geolocation.getCurrentPosition().then(resp => {
          const lat = resp.coords.latitude;
          const long = resp.coords.longitude;
          let gapi ='https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyASp5bG5UOFUcL_b_jxjJjPAtQd7JRhtb4';
      this.http.get(gapi, {}).subscribe((data) => {
      let re=(data.json());
        this.location=(re.results[0].formatted_address);
      });

          //console.log(k.getMonth());
          let datex =
            k.getFullYear() + "-" + (k.getMonth() + 1) + "-" + k.getDate();
          let api =
            "https://api.sunrise-sunset.org/json?lat=+" +
            lat +
            "&lng=" +
            long +
            "&date=" +
            datex;
          //console.log(api);
          this.http.get(api, {}).subscribe(data => {
            const results = data.json();
            //console.log(results);
            //console.log(results.results.sunrise);
            const d1 = new Date(
              "Thu Jan 01 1970 " + results.results.sunrise + " UTC"
            );
            const d2 = new Date(
              "Thu Jan 01 1970 " + results.results.sunset + " UTC"
            );
            //console.log(d1);

            this.sunrise = d1.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false
            });
            this.sunset = d2.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false
            });
          });
          k.setDate(k.getDate() + 1); //Tomorrow
          datex =
            k.getFullYear() + "-" + (k.getMonth() + 1) + "-" + k.getDate();
          api =
            "https://api.sunrise-sunset.org/json?lat=+" +
            lat +
            "&lng=" +
            long +
            "&date=" +
            datex;
          //console.log(api);
          this.http.get(api, {}).subscribe(data => {
            const results = data.json();
            console.log(results);
            console.log(results.results.sunrise);
            const d1 = new Date(
              "Thu Jan 01 1970 " + results.results.sunrise + " UTC"
            );
            //const d2 = new Date('Thu Jan 01 1970 ' + results.results.sunset + ' UTC');

            //console.log(d1);

            this.sunriseT = d1.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false
            });
          });
          k.setDate(k.getDate() - 2); //Yesterday
          datex =
            k.getFullYear() + "-" + (k.getMonth() + 1) + "-" + k.getDate();
          api =
            "https://api.sunrise-sunset.org/json?lat=+" +
            lat +
            "&lng=" +
            long +
            "&date=" +
            datex;
          console.log(api);
          this.http.get(api, {}).subscribe(data => {
            const results = data.json();
            console.log(results);
            console.log(results.results.sunrise);
            const d1 = new Date(
              "Thu Jan 01 1970 " + results.results.sunrise + " UTC"
            );
            const d2 = new Date(
              "Thu Jan 01 1970 " + results.results.sunset + " UTC"
            );
            //console.log(d1);
            this.sunsetY = d2.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: false
            });
            this.calcTime();
          });
        }).catch(()=>{
          alert('Unable to get location. Please Ensure your Internet is working and GPS is Turned ON');
            this.router.navigate(['manual']);
        });
      });
  }

  calcTime () {
    console.log(this.sunrise);
    const rise = new Date('Thu Jan 02 1970 ' + this.sunrise);
    const set = new Date('Thu Jan 02 1970 ' + this.sunset);
    const set0 = new Date('Thu Jan 01 1970 ' + this.sunsetY);
    const rise2 = new Date('Thu Jan 03 1970 ' + this.sunriseT);
    const lengthOfPrevNight = rise.getTime() - set0.getTime();
    const lengthOfDay = set.getTime() - rise.getTime();
    const lengthOfNight = rise2.getTime() - set.getTime();
    const agumentedHrDay = lengthOfDay / 12;
    const agumentedHrNight = lengthOfNight / 12;
    const agumentedHrPrevNight=lengthOfPrevNight/12;
    const agumentedMinDay = agumentedHrDay / 60;
    const agumentedMinNight = agumentedHrNight / 60;
    const agumentedMinPrevNight = agumentedHrPrevNight / 60;
    const n = rise.getTime() + 6 * agumentedHrDay;
    //this.noon = new Date(n);
    
    this.noon = (new Date(n)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.zuhrs = (new Date(n + 60000)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.zuhre = (new Date(n + 2 * agumentedHrDay)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.start7 = (new Date(n - agumentedHrDay)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.end8 = (new Date(n +  agumentedHrDay)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.asre = (new Date(n + 4 * agumentedHrDay)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    let s = set.getTime();
    let r = rise2.getTime();

    const nn = set.getTime() + 6 * agumentedHrNight;
    this.ishae = (new Date(nn)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.ishas = new Date(s + 40 * agumentedMinNight).toLocaleString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      }
    );
    s = set0.getTime();
    r=rise.getTime();

    this.fajrs = new Date(r - 70 * agumentedMinPrevNight).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
   
    this.fajre = new Date(r - 5 * agumentedMinNight).toLocaleString(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      }
    );
    
  }
  prev(){
    this.pdate.setDate(this.pdate.getDate() - 1);
    console.log(this.pdate);
    this.datetoday = this.pdate.toLocaleDateString('en-US', this.options);
    this.ngOnInit();
  }
  next(){
    console.log(this.pdate);
    console.log(this.pdate.getDate() + 1);
    this.pdate.setDate(this.pdate.getDate() + 1);
    console.log(this.pdate);
    this.datetoday = this.pdate.toLocaleDateString('en-US', this.options);
    this.ngOnInit();
  }
}
