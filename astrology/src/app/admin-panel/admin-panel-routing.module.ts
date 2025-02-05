import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-panel.component';
import { AstrologicalDictionaryComponent } from './astrological-dictionary/astrological-dictionary.component';
import { DreamDictionaryComponent } from './dream-dictionary/dream-dictionary.component';
import { ZodiacSignComponent } from './zodiac-sign/zodiac-sign.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'astrological-dictionary',
        pathMatch: 'full',
      },
      {
        path: 'astrological-dictionary',
        component: AstrologicalDictionaryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dream-dictionary',
        component: DreamDictionaryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'zodiac-sign',
        component: ZodiacSignComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
