import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { EditComponentComponent } from './components/edit-component/edit-component.component';
import { ReturnAssetComponent } from './components/return-asset/return-asset.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTransactionComponent,
    TransactionCardComponent,
    EditComponentComponent,
    ReturnAssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
