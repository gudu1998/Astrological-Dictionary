import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientPanelComponent } from './client-panel.component';
import { ClientPanelRoutingModule } from './client-panel-routing.module';
import { CommonModule } from '@angular/common';
import { ClientHeaderComponent } from './header/client-header.component';
import { AstrologicalDictionaryComponent } from './astrological-dictionary/astrological-dictionary.component';
import { DreamDictionaryComponent } from './dream-dictionary/dream-dictionary.component';
import { AstrologicalProfileComponent } from './astrological-profile/astrological-profile.component';

@NgModule({
  declarations: [
    ClientHeaderComponent,
    FooterComponent,
    HomeComponent,
    ClientPanelComponent,
    AstrologicalDictionaryComponent,
    DreamDictionaryComponent,
    AstrologicalProfileComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ClientPanelRoutingModule
  ]
})
export class ClientPanelModule { }
