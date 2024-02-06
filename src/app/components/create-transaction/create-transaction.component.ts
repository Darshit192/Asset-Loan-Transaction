import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html', // Correct path for the template
  styleUrls: ['./create-transaction.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionComponent {
  userData: any;
  assetData: any;
  showError = false;
  closeModalEmitter = new EventEmitter<boolean>();
  loaningSupervisor: FormControl = new FormControl(null);
  student: FormControl = new FormControl(null);
  loanDate: FormControl = new FormControl(null);
  asset: FormControl = new FormControl(null);

  constructor(
    private ref: MatDialogRef<CreateTransactionComponent>,
    private _CommonServicesService: CommonServicesService
  ) {}

  ngOnInit(): void {
    this.apiCalls();
  }

  apiCalls() {
    this._CommonServicesService.fetchUsers().subscribe((response) => {
      this.userData = response;
    });
    this._CommonServicesService.fetchAssets().subscribe((response) => {
      this.assetData = response;
    });
  }
  closeModal() {
    this.ref.close();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  onFormSubmit() {
    const random_uuid = this.uuidv4();
    const Loan = 'Loan';
    const loaningSupervisorValue = this.loaningSupervisor.value;
    const studentValue = this.student.value;
    const assetValue = this.asset.value;
    const loanDateValue = new Date(this.loanDate.value).toISOString();
    const name = studentValue
      ? studentValue.firstName + ' ' + studentValue.lastName
      : null;
    const name1 = loaningSupervisorValue
      ? loaningSupervisorValue.firstName + ' ' + loaningSupervisorValue.lastName
      : null;
    if (
      loaningSupervisorValue &&
      studentValue &&
      assetValue &&
      this.loanDate.value
    ) {
      this._CommonServicesService
        .postTransaction({
          id: random_uuid,
          loaningSupervisorId: loaningSupervisorValue.id,
          loaningSupervisorname: name1,
          studentId: studentValue.id,
          studentname: name,
          assetId: assetValue.id,
          assetName: assetValue.name,
          loanDate: loanDateValue,
          transactionType: Loan,
        })
        .subscribe(
          (response) => {
            console.log('Transaction successful:', response);
          },
          (error) => {
            console.error('Error during transaction:', error);
          }
        );
      this.closeModalEmitter.emit(true);
      this.closeModal();
    } else {
      this.showError = true;
    }
  }
}
