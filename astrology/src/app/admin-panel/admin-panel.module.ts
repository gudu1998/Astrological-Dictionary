import { NgModule } from '@angular/core';
import { AdminHeaderComponent } from './header/admin-header.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin-panel.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AstrologicalDictionaryComponent } from './astrological-dictionary/astrological-dictionary.component';
import { DreamDictionaryComponent } from './dream-dictionary/dream-dictionary.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TeleReadMoreComponent } from './tele-read-more/tele-read-more.component';
import { ZodiacSignComponent } from './zodiac-sign/zodiac-sign.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AdminHeaderComponent,
    AdminComponent,
    SideMenuComponent,
    AstrologicalDictionaryComponent,
    DreamDictionaryComponent,
    TeleReadMoreComponent,
    ZodiacSignComponent,
    LoginComponent,
    LoaderComponent
  ],
  imports: [
    AdminPanelRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    CKEditorModule,
    ReactiveFormsModule,
]
})
export class AdminPanelModule { }
