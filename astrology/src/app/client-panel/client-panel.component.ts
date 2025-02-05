import { Component } from '@angular/core';

@Component({
  template: `
    <client-header></client-header>
  <router-outlet></router-outlet>
<app-footer></app-footer>

  `,
  selector: 'client-panel',
})
export class ClientPanelComponent {}
