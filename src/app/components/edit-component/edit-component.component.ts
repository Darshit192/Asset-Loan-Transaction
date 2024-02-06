import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  EventEmitter,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html', // Correct path for the template
  styleUrls: ['./edit-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponentComponent {
  assetData;
  transactionData;
  userData;
  closeModalEmitter = new EventEmitter<boolean>();
  asset: FormControl;
  loanDate: FormControl;
  transactionTyp: FormControl;
  loaningSupervisor: FormControl;
  student: FormControl;

  constructor(
    private ref: MatDialogRef<EditComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _CommonServicesService: CommonServicesService
  ) {}
  ngOnInit(): void {
    this._CommonServicesService.fetchUsers().subscribe((response) => {
      this.userData = response;
    });
    this._CommonServicesService.fetchAssets().subscribe((response) => {
      this.assetData = response;
    });
    this._CommonServicesService.fetchTransactions().subscribe((response) => {
      this.transactionData = response;
    });
    this.asset = new FormControl(this.data.assetName);
    this.student = new FormControl(this.data.studentname);
    this.loaningSupervisor = new FormControl(this.data.loaningSupervisorname);
    this.transactionTyp = new FormControl(this.data.transactionType);
    this.loanDate = new FormControl(this.data.loanDate);
  }

  closeModal() {
    this.ref.close();
  }

  onFormSubmit() {
    const loaningSupervisorValue = this.loaningSupervisor.value;
    const studentValue = this.student.value;
    const assetValue = this.asset.value;
    const loanDateValue = new Date(this.loanDate.value).toISOString();
    const name = studentValue.firstName
      ? studentValue.firstName + ' ' + studentValue.lastName
      : this.data.studentname;
    const name1 = loaningSupervisorValue.firstName
      ? loaningSupervisorValue.firstName + ' ' + loaningSupervisorValue.lastName
      : this.data.loaningSupervisorname;
    const transactionTypeValue = this.transactionTyp.value;
    this._CommonServicesService
      .updateTransaction(this.data.id, {
        loaningSupervisorId: loaningSupervisorValue
          ? loaningSupervisorValue.id
          : null,
        loaningSupervisorname: name1,
        studentId: studentValue.id,
        studentname: name,
        assetId: assetValue ? assetValue.id : null,
        assetName: assetValue ? assetValue.name : null,
        loanDate: loanDateValue,
        transactionType: transactionTypeValue,
      })
      .subscribe(
        (response) => {
          console.log('Updation successful:', response);
        },
        (error) => {
          console.error('Error during updation:', error);
        }
      );
    this.closeModalEmitter.emit(true);
    this.closeModal();
  }
}
