import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPanelComponent } from './client-panel.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: ClientPanelComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPanelRoutingModule {}
