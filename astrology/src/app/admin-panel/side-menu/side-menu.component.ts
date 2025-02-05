import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  activeMenu: string = 'astrologicalDictionary';

  constructor(private _router: Router) {}

  ngOnInit(): void {
    const storedMenu = localStorage.getItem('activeMenu');
    if (storedMenu) {
      this.activeMenu = storedMenu;
    }
  }

  setActiveMenu(menu: string, route: string) {
    this.activeMenu = menu;
    localStorage.setItem('activeMenu', menu);
    this._router.navigate([route]);
  }
}
