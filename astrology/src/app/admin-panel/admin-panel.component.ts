import { Component } from '@angular/core';

@Component({
  template: `
    <div class="d-flex flex-column">
      <admin-header></admin-header>
      <div class="admin-container">
        <side-menu></side-menu>
        <div class="content-container">
        <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .admin-container {
        margin-top: 4.5rem;
      }

      .content-container {
  margin-left: 250px;
  padding: 20px;
  flex-grow: 1;
  background-color: #f9f9f9;
  min-height: 100vh;
  overflow-y: auto;
}
    `,
  ],
  selector: 'admin-panel',
})
export class AdminComponent {

}
