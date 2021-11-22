import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'car-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss']
})
export class CommonLayoutComponent implements OnInit {

  public footerYear: string;

  public constructor() { }

  public ngOnInit(): void {
    if (moment().year() === 2021) {
      this.footerYear = '2021';
    } else {
      this.footerYear = `2021-${moment().year()}`;
    }

  }

}