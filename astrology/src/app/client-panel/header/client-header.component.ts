import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss'],
})
export class ClientHeaderComponent implements OnInit {
  constructor(private _router: Router) {}
  isMobileDevice: boolean = false;
  clientActiveMenu: string = 'home';
  showSideMenu: boolean = true;
  showCrossMenu: boolean = false;

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

    const storedMenu = localStorage.getItem('clientActiveMenu');
    if (storedMenu) {
      this.clientActiveMenu = storedMenu;
    }
  }

  setActiveMenu(menu: string, route: string) {
    this.clientActiveMenu = menu;
    localStorage.setItem('clientActiveMenu', menu);
    this._router.navigate([route]);
    this.showSideMenu = true;
    this.showCrossMenu = false;
  }

  showMenu() {
    this.showSideMenu = false;
    this.showCrossMenu = true;
  }

  closeMenu() {
    this.showSideMenu = true;
    this.showCrossMenu = false;
  }
}
