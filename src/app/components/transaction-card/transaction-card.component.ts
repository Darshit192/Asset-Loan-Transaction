import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { MatDialog } from '@angular/material/dialog';
import { EditComponentComponent } from '../edit-component/edit-component.component';
import { ReturnAssetComponent } from '../return-asset/return-asset.component';
@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html', // Correct path for the template
  styleUrls: ['./transaction-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TransactionCardComponent { 
  @Input() imageSource: string[];
  @Input() parentOption: any = null;
  @Input() dataTrans: any;
  @Output() out = new EventEmitter<any>();
  isExpanded = false;
  dialogRef
  
  constructor( private commonServicesService: CommonServicesService,
    private dialog:MatDialog,
    ){}

  ngOnInit(){
  }

  isLoan() : boolean{
    return this.dataTrans.transactionType === 'Loan';
  }
  callComponent() {
    this.dialogRef= this.dialog.open(ReturnAssetComponent,{
      width: '350px',
      data: this.dataTrans,
    });
    if (this.dialogRef) {
      this.dialogRef.afterClosed().subscribe((result: boolean) => {
        this.out.emit(this.parentOption);
      });
    }
    }
    callComponent1() {
       this.dialogRef= this.dialog.open(EditComponentComponent,{
        width: '350px',
        data: this.dataTrans,
      });
      if (this.dialogRef) {
        this.dialogRef.afterClosed().subscribe((result: boolean) => {
          this.out.emit(this.parentOption);
        });
      }
    }
  
    
    toggleCard() {
      this.isExpanded = !this.isExpanded;
    }

  
    isSupervisor() {
      return this.parentOption && this.parentOption.role === "Supervisor"
    }
  
    isReturnTransaction(): boolean {
      return this.dataTrans.transactionType === 'Return';
    }

}
