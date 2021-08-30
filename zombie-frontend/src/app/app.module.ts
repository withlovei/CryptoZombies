import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChangeNameComponent} from "./modal/change-name.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmDialogComponent} from "./confirm/confirm-dialog.component";
import {ChangeAddressComponent} from "./address-modal/change-address.component";

@NgModule({
  declarations: [
    AppComponent,
    ChangeNameComponent,
    ConfirmDialogComponent,
    ChangeAddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ChangeNameComponent, ConfirmDialogComponent, ChangeAddressComponent],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
