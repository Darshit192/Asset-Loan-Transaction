import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-return-asset',
  templateUrl: './return-asset.component.html', // Correct path for the template
  styleUrls: ['./return-asset.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReturnAssetComponent { 

  assetData;
  transactionData;
  userData;
  closeModalEmitter = new EventEmitter<boolean>();
  asset: FormControl;
  loanDate: FormControl;
  returnDate: FormControl;
  loaningSupervisor : FormControl;
  student : FormControl;
  recievingSupervisor:FormControl;
  showError=false;
  constructor(private ref: MatDialogRef<ReturnAssetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _CommonServicesService: CommonServicesService,)
  {
  }

  ngOnInit(): void {
    this._CommonServicesService.fetchUsers().subscribe(response => {
      this.userData = response;
    });
    this._CommonServicesService.fetchAssets().subscribe(response => {
      this.assetData = response;
    });
    this._CommonServicesService.fetchTransactions().subscribe(response => {
      this.transactionData = response;
    });
    this.asset= new FormControl(this.data.assetName);
  this.student = new FormControl(this.data.studentname);
  this.loaningSupervisor = new FormControl(this.data.loaningSupervisorname);
  this.recievingSupervisor = new FormControl(null);
  this.loanDate = new FormControl(this.data.loanDate);
  this.returnDate = new FormControl();
   
  }
  closeModal(){
    this.ref.close();
  }

  onFormSubmit() {
      const loaningSupervisorValue = this.loaningSupervisor.value;
      const recievingSupervisorValue = this.recievingSupervisor.value;
      const studentValue = this.student.value;
      const assetValue = this.asset.value;
      const loanDateValue = this.loanDate.value;
      const returnDatevalue=new Date(this.returnDate.value).toISOString();;
      const name = (studentValue.firstName)?studentValue.firstName + " " + studentValue.lastName: this.data.studentname
      const name1 = this.data.loaningSupervisorname; 
      const name2 =recievingSupervisorValue?recievingSupervisorValue.firstName + " " + recievingSupervisorValue.lastName: null; 
      

      if(recievingSupervisorValue != null && this.returnDate.value!=null){
        console.log(loaningSupervisorValue);
      this._CommonServicesService.updateTransaction(this.data.id,{
        loaningSupervisorId : this.data.loaningSupervisorId,
        receivingSupervisorId: recievingSupervisorValue?recievingSupervisorValue.id:null,
        receivingSupervisorname: name2,
        loaningSupervisorname: name1,
        studentId: this.data.studentId,
        studentname : name,
        assetId: this.data.assetId,
        assetName: this.data.assetName,
        loanDate: loanDateValue,
        returnDate: returnDatevalue,
        transactionType: this.data.transactionType == "Loan" ? "Return" : null,
      }).subscribe(
        (response) => {
          console.log('Return successful:', response);
  
        },
        (error) => {
          console.error('Error during return:', error);
        }
      );
      this.closeModalEmitter.emit(true);
      this.closeModal();
    }
    else{
      this.showError=true;
    }
    
  }
  

}
