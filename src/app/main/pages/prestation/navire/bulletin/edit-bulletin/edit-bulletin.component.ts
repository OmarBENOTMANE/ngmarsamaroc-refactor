import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LigneCommandeService } from 'src/app/main/core/services/navire/ligne-commande.service';
import { LigneCommande } from 'src/app/main/core/models/navire/ligne-commande.model';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { DialogComponent, DialogModel } from 'src/app/main/shared/component/dialog/dialog.component';
import { SnackbarComponent } from 'src/app/main/shared/component/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FileService } from 'src/app/main/core/services/file.service';
import { Observable } from 'rxjs';
import { Permission } from 'src/app/main/core/auth/permissions';
import { FormsModule } from '@angular/forms';
import { CancelDialogComponent, CancelDialogModel } from 'src/app/main/shared/component/cancel-dialog/cancel-dialog.component';


@Component({
  selector: 'app-view-history-command',
  templateUrl: './edit-bulletin.component.html',
  styleUrls: ['./edit-bulletin.component.scss']
})



export class EditBulletinComponent implements OnInit {

  isChecked = false;
  file: File | null = null

  selectedFiles: FileList;
  currentFile: File | null;
  myFiles: string[] = [];
  fileInfos: Observable<any>;
  displayedColumns: string[] = ['selected', 'codeP', 'lib', 'codeCpa', 'nop', 'dateD', 'heureD', 'dateF', 'heureF'];
  data1: any = [];
  panelOpenState = true;
  cmdId: string;
  numBp: number;
  cmdLine1: any = [];
  cmdForm: FormGroup;
  cmd: any;
  currentFileName : any;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(private http: HttpClient,
    private route: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cmdService: CommandeService,
    public dialog: MatDialog,
    private lineCmdService: LigneCommandeService,
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
      
    })
    
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
      Status: [this.cmd.status],
      file: [''],
      shipLength: [this.cmd.shipLength]
    })
  }

  getBpLine(numDoss: any) {
    this.lineCmdService.getLBP(numDoss).subscribe(
      result => {
        this.cmdLine1 = result['content'];
      }
    )
  }

  /*onFileChange(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }*/
  selectFile(event){
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles)
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile?.name)
  
    this.uploadService.upload(this.currentFile,this.cmdId).subscribe(
      event => {
        this.uploadService.getFileName(this.cmdId).subscribe(
          res => {
            this.currentFileName = res;
            this.fileInfos = res;
            this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 4000,
            data: { message: 'Le fichier a été téléchargé avec succés', icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
          }         
        );       
      }
    )
  }

  upload(){
    this.currentFile = this.selectedFiles.item(0);
  
    this.uploadService.upload(this.currentFile,this.cmdId).subscribe(
      event => {
        this.fileInfos = this.uploadService.getFileName(this.cmdId);
        console.log(this.fileInfos)
      }
    )
  }
  download(){
    /*this.uploadService.getFiles(this.cmdId).subscribe(
      event=> {
        console.log("Hello world");
      }
    )*/
    location.href=this.uploadService.getUrlFile(this.cmdId);
    // window.open(this.uploadService.getUrlFile(this.cmdId));
  }

  slideToggleChange(event: MatSlideToggleChange) {
    // console.log('toggle', event.checked);
    this.isChecked = event.checked;
  }

  validateBp() {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous valider le bulletin de prestation N: <p class="font-bold inline">${this.cmd.numeroBulletinPrestation} </p> ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.validateCMD(this.numBp, true).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.cmd = bultinP;
            this.createForm();
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: `Le bulletin de prestation nº${this.cmd.numeroBulletinPrestation} a été validé avec succés`  , icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });
  }

  unvalidateBp() {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous annuler la validation du bulletin de prestation N: <p class="font-bold inline">${this.cmd.numeroBulletinPrestation} </p> ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.validateCMD(this.numBp, false).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.cmd = bultinP;
            this.createForm();
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: `Le validation du bulletin de prestation nº${this.cmd.numeroBulletinPrestation} a été annulée avec succés`, icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });
  }

  sendBp() {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous envoyer le bulletin de prestation N: <p class="font-bold inline">${this.cmd.numeroBulletinPrestation} </p> ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.sendCMD(this.numBp).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.route.navigateByUrl("/navire/historique-bp")
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: `Le bulletin de prestation nº${this.cmd.numeroBulletinPrestation} a été envoyé avec succés`, icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });
  }

  deleteBp() {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous supprimer le bulletin de prestation pour cette commande?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.cancelGenerationCMD(this.cmdId).subscribe(result => {
          this.route.navigateByUrl("/navire/cmd/" + this.cmdId)
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: 'Le bulletin de prestation a été supprimé avec succés', icon: 'heroicons_outline:check-circle' },
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
  prevalidate(){
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous prévalider le bulletin de prestation N: <p class="font-bold inline">${this.cmd.numeroBulletinPrestation} </p> ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.preValidateBP(this.numBp, true).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.cmd = bultinP;
            this.createForm();
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: `Le bulletin de prestation nº${this.cmd.numeroBulletinPrestation} a été prévalidé avec succés`, icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });
  }
  unprevalidate(){
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous annuler la prévalidation du bulletin de prestation nº${this.cmd.numeroBulletinPrestation} ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.preValidateBP(this.numBp, false).subscribe(result => {
          this.cmdService.getCmdByid(this.cmdId).subscribe(bultinP => {
            this.cmd = bultinP;
            this.createForm();
          })
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: `La prévalidation du bulletin de prestation nº${this.cmd.numeroBulletinPrestation} a été annulée avec succés`, icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })
      } 
    });
  }

  deleteFile(){
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous supprimer le fichier du bulletin de prestation nº${this.cmd.numeroBulletinPrestation}?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.uploadService.deleteFile(this.cmdId).subscribe(result => {
          this.uploadService.getFileName(this.cmdId).subscribe(
            res => {
              this.currentFileName = res;
              this.fileInfos = res;
              this.isChecked= false
              this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 4000,
              data: { message: 'Le fichier a été supprimé avec succés', icon: 'heroicons_outline:check-circle' },
              verticalPosition: "top",
              panelClass: ['green-snackbar']
            })
            }
            
          );
          // this.currentFileName = null;
            // this.fileInfos = null;
          /*this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: `Le fichier a été supprimé avec succés`, icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })*/
        })
      } 
    });
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
  
    
}
