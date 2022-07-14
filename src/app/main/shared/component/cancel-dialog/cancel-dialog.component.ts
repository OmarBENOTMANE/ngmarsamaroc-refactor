import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-cancel-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss']
})
export class CancelDialogComponent implements OnInit {

  selectedReason : string = 'Raison 1';
  choicesList : any;

  constructor(public dialogRef: MatDialogRef<CancelDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CancelDialogModel,
              public cmdService : CommandeService,
              private route: Router,
              public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    console.log(this.data.numBp);
    this.cmdService.getReasons().subscribe(
      data => {
        this.choicesList = data;
        console.log(this.choicesList)
      }
      )
  }

  selectChangeHandler (event : any) {
    this.selectedReason = event.target.value
    console.log(event.target.value)
  }

  onConfirm(): void {
    // Close the dialog, return true
    //this.cmdService.cancelB  
    this.cmdService.precancelBP(this.data.numBp, this.selectedReason, true).subscribe(
      (result) => {
        // console.log(result);
        this.route.navigateByUrl("navire/historique-bp");
        this.dialogRef.close(false);
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: { message: `Le bulletin de prestation nº${this.data.numBp} a été annulé avec succés`, icon: 'heroicons_outline:check-circle' },
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        })
      },
      (error) => {
        let errorMessage =''
        if (error.error.message == 'Bp not sent to preCancel'){
          errorMessage = 'Le bulletin n\'a pas été envoyé'
        }
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: { message: 'Error '+ error.status + ': '+errorMessage, icon: 'heroicons_outline:information-circle' },
          verticalPosition: "top",
          panelClass: ['yellow-snackbar']
        })
      }
    )
    
   }




  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}



/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
 export class CancelDialogModel {

  constructor(public title: string,
              public message: string,
              public icon:{
                name : string,
                color : string
              },
              public numBp :number) {
  }
}
