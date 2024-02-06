import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonServicesService } from './services/common-services.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'transactions';
  userData: any;
  selectedOption: any = null;
  isSupervisor = false;
  assetData;
  transactionData;
  assetCards;
  userCards;
  dateCards;
  selectedDate;
  dialogRef;
  dataConstant;
  isShow = true;
  isDataFound: boolean = true;
  isDataFound1: boolean = true;
  isDataFound2: boolean = true;
  parentImageSource = [
    '../assets/MicrosoftTeams-image.png',
    '../assets/OIP.png',
    '../assets/Image.png',
  ];
  selectedUser: FormControl = new FormControl(null);
  selectedAsset: FormControl = new FormControl(null);
  constructor(
    private _CommonServicesService: CommonServicesService,
    private dialog: MatDialog
  ) {}
  @ViewChild('noDataFound') noDataFound;

  shouldShowNoDataTemplate: boolean = false; 

  ngOnInit(): void {
    this.apiCalls();
  }
  handleEmittedValue(emittedValue: any): void {
    this.selectedOption = emittedValue;
    this.apiCalls();
  }

  checkIsSupervisor() {
    if (this.selectedOption.role == 'Supervisor') {
      this.isSupervisor = true;
      this.transactionData = this.dataConstant;
    } else {
      const data = this.dataConstant.filter(
        (item) => item.studentId === this.selectedOption.id
      );
      this.transactionData = data;
      this.isSupervisor = false;
      console.log(this.transactionData.length);
      
      if (this.transactionData.length == 0) {
        this.shouldShowNoDataTemplate = true;
        this.isShow = false;
      }
    }
  }

  createTransaction() {
    this.dialogRef = this.dialog.open(CreateTransactionComponent, {
      width: '350px',
    });
    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: boolean) => {
        this.apiCalls();
      });
    }
  }

  onUserSelect() {
    this.isDataFound = this.transactionData.some((transaction) =>
      this.shouldDisplayTransaction(transaction)
    );
  }

  onAssetSelect() {
    this.isDataFound1 = this.transactionData.some((transaction) =>
      this.shouldDisplayTransaction(transaction)
    );
  }
  onDateSelect() {
    this.isDataFound2 = this.transactionData.some((transaction) =>
      this.shouldDisplayTransaction(transaction)
    );
  }
  shouldDisplayTransaction(transaction: any): boolean {
    const a =
      this.selectedUser.value == null ||
      (this.selectedUser.value != null &&
        transaction.studentId === this.selectedUser.value.id) ||
      transaction.loaningSupervisorId === this.selectedUser.value.id ||
      transaction.receivingSupervisorId === this.selectedUser.value.id;

    const b =
      this.selectedAsset.value == null ||
      (this.selectedAsset.value != null &&
        transaction.assetId === this.selectedAsset.value.id);

    const c =
      this.selectedDate == null ||
      (this.selectedDate != null &&
        transaction.loanDate != undefined &&
        this.selectedDate === transaction.loanDate.substring(0, 10));
    return a && b && c;
  }

  apiCalls() {
    this._CommonServicesService.fetchUsers().subscribe((response) => {
      this.userData = response;
    });
    this._CommonServicesService.fetchAssets().subscribe((response) => {
      this.assetData = response;
    });
    this._CommonServicesService.fetchTransactions().subscribe((response) => {
      this.transactionData = response;
      this.dataConstant = response;
    });
  }
}
