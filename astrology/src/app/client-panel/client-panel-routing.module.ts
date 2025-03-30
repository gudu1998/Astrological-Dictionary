import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientPanelComponent } from './client-panel.component';
import { HomeComponent } from './home/home.component';
import { AstrologicalDictionaryComponent } from './astrological-dictionary/astrological-dictionary.component';
import { DreamDictionaryComponent } from './dream-dictionary/dream-dictionary.component';
import { AstrologicalProfileComponent } from './astrological-profile/astrological-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ClientPanelComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'astro-dictionary',
        component: AstrologicalDictionaryComponent,
      },
      {
        path: 'dream-dictionary',
        component: DreamDictionaryComponent,
      },
      {
        path: 'astrological-profile',
        component: AstrologicalProfileComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPanelRoutingModule {}
