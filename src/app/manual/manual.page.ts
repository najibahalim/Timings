import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
})
export class ManualPage implements OnInit {

  constructor(private router: Router, private storage:Storage) { }
  sunrise;
  sunset;
  sunsetY;
  sunriseT;
  ngOnInit() {
  }
  calcTime(){
    const data={
      sunrise:this.sunrise,
      sunset:this.sunset,
      sunsetY:this.sunsetY,
      sunriseT:this.sunrise

    }
    // this.storage.set('sunrise',this.sunrise);
    // this.storage.set('sunset', this.sunset);
    // this.storage.set('sunset0', this.sunset0);
    this.storage.set('data', data);
    this.router.navigate(['first']);
  }

  

}
