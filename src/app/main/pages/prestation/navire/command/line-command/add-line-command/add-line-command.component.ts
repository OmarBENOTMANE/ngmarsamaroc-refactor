import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { LigneCommandeService } from 'src/app/main/core/services/navire/ligne-commande.service';

@Component({
  selector: 'app-add-line-command',
  templateUrl: './add-line-command.component.html',
  styleUrls: ['./add-line-command.component.scss']
})
export class AddLineCommandComponent implements OnInit {
  displayedColumns: string[] = ['selected', 'codeMouvementNavire','libelle'];
  cmdLine: any = [];
  cmdLine1: any = [];
  cmdId1: any;
  prsId: any = [];
  
  constructor(
    public dialogRef: MatDialogRef<AddLineCommandComponent>,
    private lineCmdService: LigneCommandeService,
    private cmdService1: CommandeService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data: { route: ActivatedRoute }
  ) {
    data.route.params.subscribe(params => { this.cmdId1 = params['idcmd'] });
  }

  ngOnInit(): void {
    console.log(this.cmdId1);
    this.getCmd2Line();
  }
  getCmd2Line() {
    this.lineCmdService.getPrestations().subscribe(
      cmdLine => {
        cmdLine['content'].forEach(
          element => {
            element.checked = false;
          }
        )
        this.cmdLine1 = cmdLine['content']
      }
    )
  }

  checkElement(element: any) {
    element.checked = !element.checked;
    if (element.checked == true) {
      this.prsId.push(element.codeMouvementNavire)
    } else {
      let index = this.prsId.indexOf(element.codeMouvementNavire)
      this.prsId.splice(index, 1)
    }
    console.log(this.prsId)
  }

  // numero escale list des codes mouvements
  onAffectClick(): void {
    this.lineCmdService.generateLDC(this.cmdId1, this.prsId).subscribe(result => {
      console.log(result)
      this.dialogRef.close(true);
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
