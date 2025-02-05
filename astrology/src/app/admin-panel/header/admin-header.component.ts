import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  showSideBar: boolean = false;
  fullName!: any;
  role!: any;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.fullName = localStorage.getItem('userName');
  }

  logOut() {
    this._router.navigate(['/admin/login']);
    localStorage.clear();
  }
}
