import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { getParentInjectorLocation } from '@angular/core/src/render3/di';
import { NavController } from '@ionic/angular';
import { FirstPage } from '../first/first.page';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sub: any;
  location ="100 Feet Rd, Vishwakarma Estate, Vasai West, Tarkhad, Maharashtra 401202, India"
  constructor(private geolocation: Geolocation, private backgroundMode: BackgroundMode,
     private http: Http, private storage: Storage, private router: Router) {
      
  }

  ngOnInit(){
    const d = new Date();
    if (d.getHours() > 7 && d.getHours() < 17) {
      this.day = 'Morning';
    }
    if (d.getHours() <= 7) {
      this.choice = 2;
    }
    if (d.getHours() >= 17) {
      this.choice = 3;
    }
    this.geolocation.getCurrentPosition().then((resp) => {
      const lat = resp.coords.latitude;
      const long = resp.coords.longitude;
      /*let gapi ='https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyASp5bG5UOFUcL_b_jxjJjPAtQd7JRhtb4';
      this.http.get(gapi, {}).subscribe((data) => {
      let re=(data.json());
        this.location=(re.results[0].formatted_address);
      });*/
      const k = new Date();
      //console.log(k.getMonth());
      let datex = k.getFullYear() + '-' + (k.getMonth() + 1) + '-' + k.getDate();
      let api = 'https://api.sunrise-sunset.org/json?lat=+' + lat + '&lng=' + long + '&date=' + datex;
      //console.log(api);
      this.http.get(api, {}).subscribe((data) => {
        const results = data.json();
        //console.log(results);
        //console.log(results.results.sunrise);
        const d1 = new Date('Thu Jan 01 1970 ' + results.results.sunrise + ' UTC');
        const d2 = new Date('Thu Jan 01 1970 ' + results.results.sunset + ' UTC');
        //console.log(d1);
        this.sunrise1 = d1.toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: false
        });
        this.sunset1 = d2.toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: false
        });
      });
      k.setDate(k.getDate() + 1);
      datex = k.getFullYear() + '-' + (k.getMonth() + 1) + '-' + k.getDate();
      api = 'https://api.sunrise-sunset.org/json?lat=+' + lat + '&lng=' + long + '&date=' + datex;
      console.log(api);
      this.http.get(api, {}).subscribe((data) => {
        const results = data.json();
        console.log(results);
        console.log(results.results.sunrise);
        const d1 = new Date('Thu Jan 01 1970 ' + results.results.sunrise + ' UTC');
        const d2 = new Date('Thu Jan 01 1970 ' + results.results.sunset + ' UTC');
        // d1 = new Date(d1.getTime() + 330 * 60000);
        // d2 = new Date(d2.getTime() + 330 * 60000);
        console.log(d1);
        this.sunrise2 = d1.toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: false
        });
        this.sunset2 = d2.toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: false
        });
      });
      k.setDate(k.getDate() - 2);
      datex = k.getFullYear() + '-' + (k.getMonth() + 1) + '-' + k.getDate();
      api = 'https://api.sunrise-sunset.org/json?lat=+' + lat + '&lng=' + long + '&date=' + datex;
      console.log(api);
      this.http.get(api, {}).subscribe((data) => {
        const results = data.json();
        console.log(results);
        console.log(results.results.sunrise);
        const d1 = new Date('Thu Jan 01 1970 ' + results.results.sunrise + ' UTC');
        const d2 = new Date('Thu Jan 01 1970 ' + results.results.sunset + ' UTC');
        console.log(d1);
        this.sunset0 = d2.toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: false
        });
      });
    });
  }
  sunset0;
  sunrise1;
  sunset1 ;
  sunrise2;
  sunset2;
  noon;
  zuhrs; zuhre; fajrs; fajre; ishas; ishae; maghribs; maghribe; asrs; asre;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  datetoday = new Date().toLocaleDateString('en-US', this.options);
  day = 'Night';
  choice = 1;
  calc = false;
  dateTomrw = new Date(new Date().getTime() + 86400000).toLocaleDateString('en-US', this.options);
  dateYes = new Date(new Date().getTime() - 86400000).toLocaleDateString('en-US', this.options);
  next() {
    if (this.choice === 1) {
      this.calc1();
    } else if (this.choice === 2) {
      this.calc2();
    } else {
      this.calc3();
    }

  }

  reset(){
   this.ngOnInit();
   this.calc=false;
    this.sunset0 =null;
    this.sunrise1 = null;
    this.sunset1 = null;
    this.sunrise2 = null;
    this.sunset2 = null;
  }

  calc1() {
    this.calc = true;
    const rise = new Date('Thu Jan 01 1970 ' + this.sunrise1);
    const set = new Date('Thu Jan 01 1970 ' + this.sunset1);
    const rise2 = new Date('Thu Jan 02 1970 ' + this.sunrise2);
    const x = set.getTime() - rise.getTime();
    const lengthOfDay = x;
    const lengthOfNight = rise2.getTime() - set.getTime();
    const agumentedHrDay = lengthOfDay / 12;
    const agumentedHrNight = lengthOfNight / 12;
    const agumentedMinDay = agumentedHrDay / 60;
    const agumentedMinNight = agumentedHrNight / 60;
    const n = rise.getTime() + 6 * agumentedHrDay;
    this.noon = new Date(n);
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
    this.asre = (new Date(n + 4 * agumentedHrDay)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    const s = set.getTime();
    const r = rise2.getTime();
    
    const nn = set.getTime() + 6 * agumentedHrNight;
    this.ishae = (new Date(nn)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });

    this.fajrs = new Date(r - 70 * agumentedMinNight).toLocaleString('en-US', {
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
  calc3() {
    this.calc = true;
    const set2 = new Date('Thu Jan 01 1970 ' + this.sunset1);
    const rise = new Date('Thu Jan 02 1970 ' + this.sunrise2);
    const set = new Date('Thu Jan 02 1970 ' + this.sunset2);
    const x = set.getTime() - rise.getTime();
    const lengthOfDay = x;
    const lengthOfNight = rise.getTime() - set2.getTime();
    const agumentedHrDay = lengthOfDay / 12;
    const agumentedHrNight = lengthOfNight / 12;
    const agumentedMinDay = agumentedHrDay / 60;
    const agumentedMinNight = agumentedHrNight / 60;
    const n = rise.getTime() + 6 * agumentedHrDay;
    this.noon = new Date(n);
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
    this.asre = (new Date(n + 4 * agumentedHrDay)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    const s = set2.getTime();
    const r = rise.getTime();
    
    const nn = set2.getTime() + 6 * agumentedHrNight;
    this.ishae = (new Date(nn)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });

    this.ishas = new Date(s + agumentedMinNight * 40).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    });
    this.fajrs = new Date(r - 70 * agumentedMinNight).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.fajre = new Date(r - 5 * agumentedMinNight).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
  }
  calc2() {
    this.calc = true;
    const set2 = new Date('Thu Jan 01 1970 ' + this.sunset0);
    const rise = new Date('Thu Jan 02 1970 ' + this.sunrise1);
    const set = new Date('Thu Jan 02 1970 ' + this.sunset1);
    const x = set.getTime() - rise.getTime();
    const lengthOfDay = x;
    const lengthOfNight = rise.getTime() - set2.getTime();
    const agumentedHrDay = lengthOfDay / 12;
    const agumentedHrNight = lengthOfNight / 12;
    const agumentedMinDay = agumentedHrDay / 60;
    const agumentedMinNight = agumentedHrNight / 60;
    const n = rise.getTime() + 6 * agumentedHrDay;
    this.noon = new Date(n);
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
    this.asre = (new Date(n + 4 * agumentedHrDay)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    const s = set2.getTime();
    const r = rise.getTime();
   
    const nn = set2.getTime() + 6 * agumentedHrNight;
   

    this.fajrs = new Date(r - 70 * agumentedMinNight).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.ishae = (new Date(nn)).toLocaleString('en-US', {
      hour:
        'numeric', minute: 'numeric', second: 'numeric', hour12: true
    });
    this.ishas = (new Date(s + 40 * agumentedMinNight)).toLocaleString('en-US', {
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
}
