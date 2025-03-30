import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <client-header></client-header>
    <ng-container>
  <div *ngIf="isMobileDevice" class="client-container">
    <router-outlet></router-outlet>
  </div>
  <router-outlet *ngIf="!isMobileDevice"></router-outlet>
</ng-container>

<app-footer></app-footer>

  `,
  styles: [`
    .client-container {
      position: relative;
      top: 87px;
    }
  `],
  selector: 'client-panel',
})
export class ClientPanelComponent implements OnInit{
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
