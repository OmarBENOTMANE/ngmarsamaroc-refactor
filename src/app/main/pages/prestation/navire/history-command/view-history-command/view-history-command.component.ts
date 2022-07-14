import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTable } from "@angular/material/table";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LigneCommandeService } from 'src/app/main/core/services/navire/ligne-commande.service';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { DialogComponent, DialogModel } from 'src/app/main/shared/component/dialog/dialog.component';
import { SnackbarComponent } from 'src/app/main/shared/component/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-view-history-command',
  templateUrl: './view-history-command.component.html',
  styleUrls: ['./view-history-command.component.scss']
})



export class ViewHistoryCommandComponent implements OnInit {

  displayedColumns: string[] = ['selected', 'codeP', 'Libelle', 'nop', 'dateD', 'heureD', 'dateF', 'heureF'];
  data1: any = []
  profil = localStorage.getItem("role");
  result: string = '';
  panelOpenState = true;
  cmdId: string;
  cmdLine1: any = [];
  cmdForm: FormGroup;
  cmd: any;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(
    private route: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cmdService: CommandeService,
    public dialog: MatDialog,
    private lineCmdService: LigneCommandeService,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cmdId = this.activatedRoute.snapshot.params['idcmd'];
    this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
      this.cmd = bultinP
      this.createForm();
    }
    )
    this.getCmdLine();
  }  

  getCmdLine() {
    this.lineCmdService.getLinesBP(this.cmdId).subscribe(
      cmdLine => {
        this.cmdLine1 = cmdLine['content']
      }
    )
  }

  createForm() {
    this.cmdService.getCmdByid(this.cmdId).subscribe(
      cmd =>
        this.cmdForm = this.fb.group({
          id: [cmd.id],
          numerBP: [cmd.numerBP],
          codeCpa: [cmd.codeCpa],
          codeOperation: [cmd.codeOperation],
          codeClient: [cmd.codeClient],
          nomClient: [cmd.nomClient],
          numeroEscale: [cmd.numeroEscale],
          codeOperation1: [cmd.codeOperation1],
          codeOperation2: [cmd.codeOperation2],
          codeOperation3: [cmd.codeOperation3],
          codeNaturePrestation: [cmd.codeNaturePrestation],
          numeroFacture: [cmd.numeroFacture],
          dateLimiteFacture: [cmd.dateLimiteFacture],
          numeroCmd: [cmd.numeroCmd],
          numeroBulletinPrestation: [cmd.numeroBulletinPrestation],
          bulltinAnnule: [cmd.bulltinAnnule],
          isDeleted: [cmd.isDeleted],
          isGenerated: [cmd.isGenerated],
          isValidated: [cmd.isValidated],
          isSent: [cmd.isSent],
          statut: [cmd.status],
          shipLength: [cmd.shipLength]
        })
    )
  }
}
