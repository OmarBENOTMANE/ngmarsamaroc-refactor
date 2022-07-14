import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTable} from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { AddLineCommandComponent } from '../line-command/add-line-command/add-line-command.component';
import { EditLineCommandComponent } from '../line-command/edit-line-command/edit-line-command.component';
import { LigneCommandeService } from 'src/app/main/core/services/navire/ligne-commande.service';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { DialogComponent, DialogModel } from 'src/app/main/shared/component/dialog/dialog.component';
import { SnackbarComponent } from 'src/app/main/shared/component/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompareFields } from 'src/app/main/core/validators/customvalidator.validator';
import { ClientService } from 'src/app/main/core/services/client.service';

@Component({
  selector: 'app-modif-bp',
  templateUrl: './edit-command.component.html',
  styleUrls: ['./edit-command.component.scss']
})
export class EditCommandComponent implements OnInit {

  displayedColumns: string[] = ['selected', 'codeP', 'Libelle', 'nop', 'dateD', 'heureD', 'dateF', 'heureF'];
  panelOpenState = true;
  cmdId: string;
  cmdLine1: any = [];
  cmdForm: FormGroup;
  checkvalue: any;
  command : any;
  @ViewChild(MatTable) table: MatTable<any>;


  constructor(private http: HttpClient,
    private route: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cmdService: CommandeService,
    public dialog: MatDialog,
    private lineCmdService: LigneCommandeService,
    public snackBar: MatSnackBar,
    public route1: ActivatedRoute,
    public clientService : ClientService
  ) { }

  ngOnInit(): void {
    this.cmdId = this.activatedRoute.snapshot.params['idcmd'];
    this.createForm();
    this.getCmdLine();
  }

  createForm() {
    this.cmdService.getCmdByid(this.cmdId).subscribe(
      cmd => {
        this.command = cmd;
        this.cmdForm = this.fb.group(
        {
          id: [cmd.id],
          numeroBulletinPrestation: [cmd.numeroBulletinPrestation],
          codeCpa: [cmd.codeCpa],
          codeOperation: [cmd.codeOperation],
          codeClient: [cmd.codeClient,[Validators.required, Validators.maxLength(12)]],
          nomClient: [cmd.nomClient,[Validators.required, Validators.maxLength(36)]],
          numeroEscale: [cmd.numeroEscale,[Validators.required, Validators.maxLength(9)]],
          codeOperation1: [cmd.codeOperation1],
          codeOperation2: [cmd.codeOperation2],
          codeOperation3: [cmd.codeOperation3],
          codeNaturePrestation: [cmd.codeNaturePrestation],
          bulltinAnnule: [cmd.bulltinAnnule],
          codeCauseAnnulation: [cmd.codeCauseAnnulation],
          numeroFacture: [cmd.numeroFacture],
          dateLimiteFacture: [cmd.dateLimiteFacture],
          status: [cmd.status],
          numeroCmd: [cmd.numeroCmd],
          isDeleted: [cmd.isDeleted],
          isGenerated: [cmd.isGenerated],
          isValidated: [cmd.isValidated],
          isSent: [cmd.isSent], 
          shipLength: [cmd.shipLength]
        },
        /*{
          validators: [CompareFields("codeClient", cmd.codeClient)]
        }*/)
        // console.log(this.cmdForm.get('codeCpa')?.value)
        // console.log(this.cmdForm.value)
        // console.log(this.command)
        // console.log(this.cmdForm.value)
        // console.log(JSON.stringify(this.cmdForm.value) == JSON.stringify(this.command))
      },
        
    )
  }
  compareValues(){
    return (this.cmdForm.get('codeClient')?.value == this.command.codeClient && (this.cmdForm.get('numeroEscale')?.value == this.command.numeroEscale) && (this.cmdForm.get('nomClient')?.value == this.command.nomClient))
    //console.log((this.cmdForm.get('codeClient') == this.command.codeClient) && (this.cmdForm.get('numeroEscale') == this.command.numeroEscale) && (this.cmdForm.get('nomClient') == this.command.nomClient))
    
  }

  getCmdLine() {
    this.lineCmdService.getLinesBP(this.cmdId).subscribe(
      cmdLine => {
        this.cmdLine1 = cmdLine['content']
      }
    )
  }

  updateCmd() {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous enregistrer les modifications pour la commande N: <p class="font-bold inline">${this.command.numeroCmd}</p> ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.updateCMD(this.cmdForm.value).subscribe(
          result => {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 2000,
              data: { message: 'Les changements ont été enregistrés avec succés', icon: 'heroicons_outline:check-circle' },
              verticalPosition: "top",
              panelClass: ['green-snackbar']
            })
          })
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddLineCommandComponent, {
      maxWidth: '70vw',
      maxHeight: '70vh',
      height: '50%',
      width: '60%',
      data: {
        route: this.route1
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('The dialog was closed');
      console.log(dialogResult);
      if (dialogResult) {
        this.getCmdLine();
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: { message: 'Les changements ont été enregistrés avec succés', icon: 'heroicons_outline:check-circle' },
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        })
      }
    });
  }

  openDialog2(linecommande: any): void {
    const dialogRef = this.dialog.open(EditLineCommandComponent, {
      maxWidth: '70vw',
      maxHeight: '70vh',
      height: '50%',
      width: '60%',
      data: {
        id: linecommande.id
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('The dialog was closed');
      console.log(dialogResult);
      if (dialogResult) {
        this.getCmdLine();
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: { message: 'Les changements ont été enregistrés avec succés', icon: 'heroicons_outline:check-circle' },
          verticalPosition: "top",
          panelClass: ['green-snackbar']
        })
      }
    });
  }
  




  checkElement(element: any) {

    if (element.isSelected == true) {
      if (this.cmdLine1.filter(element => element.isSelected === true).length > 1) {
        const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous enregistrer les modifications pour cette ligne de commande?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
        const dialogRef = this.dialog.open(DialogComponent, {
          maxWidth: "500px",
          panelClass: 'navireDialog',
          data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.lineCmdService.updateAffect(element).subscribe(
              result => {
                this.snackBar.openFromComponent(SnackbarComponent, {
                  duration: 2000,
                  data: { message: 'Les changements ont été enregistrés avec succés', icon: 'heroicons_outline:check-circle' },
                  verticalPosition: "top",
                  panelClass: ['green-snackbar']
                })
                this.getCmdLine();
              }
            )
          } else {
            this.getCmdLine();

          }
        });
      }
      else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: { message: 'Vous devez au moins sélectionner une ligne de commande', icon: 'heroicons_outline:exclamation' },
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        })
        this.getCmdLine();
      }
    }
    else {
      const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous enregistrer les modifications pour cette ligne de commande commande?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
      const dialogRef = this.dialog.open(DialogComponent, {
        maxWidth: "500px",
        panelClass: 'navireDialog',
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.lineCmdService.updateAffect(element).subscribe(
            result => {
              this.snackBar.openFromComponent(SnackbarComponent, {
                duration: 2000,
                data: { message: 'Les changements ont été enregistrés avec succés', icon: 'heroicons_outline:check-circle' },
                verticalPosition: "top",
                panelClass: ['green-snackbar']
              })
              this.getCmdLine();
            }
          )
        } 
        else {
          this.getCmdLine();
        }
      });
    }
  }

  generateBp() {
    
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous générer un bulletin de prestation pour la commande N: <p class="font-bold inline">${this.command.numeroCmd}</p> ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.generateBP(this.cmdId).subscribe(result => {
          this.route.navigateByUrl("/navire/bp/" + this.cmdId)
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: 'Le bulletin de prestation a été généré avec succés', icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
        })

      } 
    });
    if (!this.compareValues()) {
    const dialogData1 = new DialogModel(`Message de confirmation`, `Voulez-vous enregistrer les modifications pour la commande N: <p class="font-bold inline">${this.command.numeroCmd}</p> ?`, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef1 = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData1
    });
    }
  }
  deleteline(id: number) {
    if (this.cmdLine1.filter(element => element.isSelected === true).length > 1) {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous supprimer cette ligne de commande?`, { name: 'heroicons_outline:exclamation', color: 'error' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.lineCmdService.deleteLDC(id).subscribe(result => {
          this.snackBar.openFromComponent(SnackbarComponent, {
            duration: 2000,
            data: { message: 'La ligne de commande a été supprimée avec succés', icon: 'heroicons_outline:check-circle' },
            verticalPosition: "top",
            panelClass: ['green-snackbar']
          })
          this.getCmdLine();
        })
       
      } 
    });
    }
    else {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 2000,
        data: { message: 'Vous devez au moins sélectionner une ligne de commande', icon: 'heroicons_outline:exclamation' },
        verticalPosition: "top",
        panelClass: ['red-snackbar']
      })
      this.getCmdLine();
    }
    
  }

  s() 
  {
    return JSON.stringify(this.cmdForm.value) == JSON.stringify(this.command);
  }

  getClientName() {
    this.clientService.getClientName(this.cmdForm.get('codeClient')?.value).subscribe(
      data => {
        console.log(data);
        this.cmdForm.get('nomClient')?.setValue(data);

      }
    )
  }



}

