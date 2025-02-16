import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit{

  isMobileDevice: boolean = false;

  ngOnInit(): void {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/windows/i.test(userAgent)) {
      this.isMobileDevice = false;
    }

    if (/android/i.test(userAgent)) {
      this.isMobileDevice = true;
    }

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      this.isMobileDevice = true;
    }
  }
}
