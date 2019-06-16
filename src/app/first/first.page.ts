import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import {Headers} from '@angular/http';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { AlertController, NavParams } from '@ionic/angular';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {

  sunrise;
  sunset;
  noon;
  zuhrs; zuhre; fajrs; fajre; ishas; ishae; maghribs; maghribe; asrs; asre;
  constructor(private http: HTTP, private alctrl: AlertController, private router: Router, private storage: Storage)  {
  }
  calc() {
  }
  ngOnInit() {
    this.storage.get('sunrise').then((val) => {
      this.sunrise = val;
      this.storage.get('sunset').then((val1) => {
        this.sunset = val1;
        console.log(this.sunrise);
        console.log(this.sunset);
        const rise = new Date('Thu Jan 01 1970 ' + this.sunrise);
        const set = new Date('Thu Jan 01 1970 ' + this.sunset);
        const x = set.getTime() - rise.getTime();
        const lengthOfDay = x;
        const lengthOfNight =  24 * 60 * 60000 - x;
        const agumentedHrDay = lengthOfDay / 12;
        const agumentedHrNight = lengthOfNight / 12;
        const agumentedMinDay = agumentedHrDay / 60;
        const agumentedMinNight = agumentedHrNight / 60;
        let n = rise.getMilliseconds() + 6 * agumentedHrDay;
        n = rise.getTime() + n;
        this.noon = (new Date(n)).toLocaleString('en-US', { hour:
          'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        this.zuhrs = (new Date(n + 60000)).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        this.zuhre = (new Date(n + 2 * agumentedHrDay)).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        this.asre = (new Date(n  + 4 * agumentedHrDay)).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        this.maghribs = (set).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        const s = set.getTime();
        const r =  rise.getTime();
        this.maghribe = (new Date(s + 15 * 60000 )).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        this.ishas = (new Date(s + 40 * 60000)).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        const nn = set.getTime() + 6 * agumentedHrNight;
        this.ishae = (new Date(nn)).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });

        this.fajre = new Date(r - 5 * 60000).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        this.fajrs =  new Date(r - 70 * agumentedMinNight).toLocaleString('en-US', {
          hour:
            'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
      });
    });
  }
}
