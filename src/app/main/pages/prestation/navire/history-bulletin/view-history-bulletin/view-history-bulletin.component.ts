import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTable } from "@angular/material/table";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { LigneCommandeService } from 'src/app/main/core/services/navire/ligne-commande.service';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { DialogComponent, DialogModel } from 'src/app/main/shared/component/dialog/dialog.component';
import { CancelDialogComponent, CancelDialogModel } from 'src/app/main/shared/component/cancel-dialog/cancel-dialog.component';
import { SnackbarComponent } from 'src/app/main/shared/component/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from 'src/app/main/core/services/file.service';
import { Permission } from 'src/app/main/core/auth/permissions';


@Component({
  selector: 'app-view-history-command',
  templateUrl: './view-history-bulletin.component.html',
  styleUrls: ['./view-history-bulletin.component.scss']
})



export class ViewHistoryBulletinComponent implements OnInit {

  currentFile: File | null;
  myFiles: string[] = [];
  //fileInfos: Observable<any>
  currentFileName : any;
  displayedColumns: string[] = ['selected', 'codeP', 'lib', 'codeCpa', 'nop', 'dateD', 'heureD', 'dateF', 'heureF'];
  data1: any = []
  profil = localStorage.getItem("role");
  result: string = '';
  panelOpenState = true;
  cmdId: string;
  numBp: any;
  cmdLine1: any = [];
  cmdForm: FormGroup;
  cmd: any;

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private http: HttpClient,
    private route: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cmdService: CommandeService,
    private lineCmdService: LigneCommandeService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private uploadService: FileService) { }

  ngOnInit(): void {
    this.cmdId = this.activatedRoute.snapshot.params['idcmd'];
    console.log(this.cmdId);
    this.uploadService.getFileName(this.cmdId).subscribe(res =>{ 
      this.currentFileName = res;
      console.log("hello")
      console.log(res);
      console.log(this.currentFileName[0])
    })
    this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
      this.cmd = bultinP;
      this.numBp = bultinP.numeroBulletinPrestation;
      this.createForm();
      this.getBpLine(bultinP.numeroBulletinPrestation);
    }
    )

  }

  download(){
    
    location.href=this.uploadService.getUrlFile(this.cmdId);
    
  }

  createForm() {
    this.cmdForm = this.fb.group({
      id: [this.cmd.id],
      numerBP: [this.cmd.numeroBulletinPrestation],
      codeCpa: [this.cmd.codeCpa],
      codeOperation: [this.cmd.codeOperation],
      codeClient: [this.cmd.codeClient],
      nomClient: [this.cmd.nomClient],
      numeroEscale: [this.cmd.numeroEscale],
      codeOperation1: [this.cmd.codeOperation1],
      codeOperation2: [this.cmd.codeOperation2],
      codeOperation3: [this.cmd.codeOperation3],
      codeNaturePrestation: [this.cmd.codeNaturePrestation],
      numeroFacture: [this.cmd.numeroFacture],
      dateLimiteFacture: [this.cmd.dateLimiteFacture],
      isValidated: [this.cmd.isValidated],
      shipLength: [this.cmd.shipLength],
      codeCauseAnnulation: [this.cmd.codeCauseAnnulation]

    })
  }

  getBpLine(numDoss: any) {
    this.lineCmdService.getLBP(numDoss).subscribe(
      result => {
        this.cmdLine1 = result['content'];
      }
    )
  }

  precancelBp() {
    const dialogData = new CancelDialogModel(`Formulaire d'annulation`, `Choisir le motif d'annulation`, { name: 'heroicons_outline:document-text', color: 'error' }, this.numBp);
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {

      }
    });
  } 
  
  sendBp() {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous envoyer le bulletin de prestation nº${this.cmd.numeroBulletinPrestation} ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.sendBP(this.numBp).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.cmd = bultinP;
            this.createForm();
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: 'Le bulletin a été envoyé avec succés', icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });
  }
  hasPermission(permission: string | undefined){
    return Permission(permission)
  }

  cancelBp() {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous approuver l'annulation du bulletin de prestation nº${this.cmd.numeroBulletinPrestation} ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.cancelBP(this.numBp).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.cmd = bultinP;
            this.createForm();
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: 'Le bulletin a été annulé avec succés', icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });
  }
  unpreCancelBp(){
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous rejeter l'annulation du bulletin de prestation nº${this.cmd.numeroBulletinPrestation} ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.precancelBP(this.numBp, 'null', false).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.cmd = bultinP;
            this.createForm();
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: 'L\'annulation du bulletin a été rejeté avec succés', icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });

  }



}
