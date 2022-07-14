import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LigneCommandeService } from 'src/app/main/core/services/navire/ligne-commande.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-edit-line-command',
  templateUrl: './edit-line-command.component.html',
  styleUrls: ['./edit-line-command.component.scss']
})
export class EditLineCommandComponent implements OnInit {
  idLine: any;
  lineForm: FormGroup;
  panelOpenState = true;
  constructor(
    public dialogRef: MatDialogRef<EditLineCommandComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: Router,
    public lcmdservice: LigneCommandeService,
    @Inject(MAT_DIALOG_DATA) data: { id: any }) {
    this.idLine = data.id;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.createForm()
  }
  
  createForm() {
    this.lcmdservice.getLCMD(this.idLine).subscribe(
      lcmd =>
        this.lineForm = this.fb.group({
          id: [lcmd.id],
          codeCpa: [lcmd.codeCpa],
          numeroBonCommande: [lcmd.numeroBonCommande],
          numeroOrdrePrestation: [lcmd.numeroOrdrePrestation],
          codePrestation: [lcmd.codePrestation],
          dateDebut: [lcmd.dateDebut,[Validators.required, Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
          heureDebut: [lcmd.heureDebut,[ Validators.required, Validators.maxLength(4),Validators.pattern("^[0-9]*$")]],
          dateFin: [lcmd.dateFin,[ Validators.required, Validators.maxLength(8),Validators.pattern("^[0-9]*$")]],
          heureFin: [lcmd.heureFin, [Validators.required, Validators.maxLength(4), Validators.pattern("^[0-9]*$")]],
          poids: [lcmd.poids],
          quantite1: [lcmd.quantite1],
          quantite2: [lcmd.quantite2],
          importExport: [lcmd.importExport],
          numeroDeclaration: [lcmd.numeroDeclaration],
          numeroCmd: [lcmd.numeroCmd],
          isDeleted: [lcmd.isDeleted],
          isSelected: [lcmd.isSelected],
          libellePrestation: [lcmd.libellePrestation],
          isGenerated: [lcmd.isGenerated]
        })
    )
  }

  onClickyes() {
    this.lcmdservice.updateLCMD(this.lineForm.value).subscribe(
      result => {
        console.log(result)
        this.dialogRef.close(true);
      }
    )
  }

  onClickno() {
    this.dialogRef.close(false)
  }
}
