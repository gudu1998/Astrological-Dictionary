import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientPanelComponent } from './client-panel.component';
import { ClientPanelRoutingModule } from './client-panel-routing.module';
import { CommonModule } from '@angular/common';
import { ClientHeaderComponent } from './header/client-header.component';

@NgModule({
  declarations: [
    ClientHeaderComponent,
    FooterComponent,
    HomeComponent,
    ClientPanelComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ClientPanelRoutingModule
  ]
})
export class ClientPanelModule { }
