import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-cancel-cancel-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  //title: string;
  //message: string;
  /*icon :{
    name : string,
    color: string
  }*/

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogModel 
  ) { 
  
    //this.title = data.title;
    //this.message = data.message;
  }

  ngOnInit(): void {
  }

  onConfirm(): void {
    // Close the dialog, return true    
    this.dialogRef.close(true);
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
 export class DialogModel {

  constructor(public title: string,
              public message: string,
              public icon:{
                name : string,
                color : string
              }) {
  }
}
