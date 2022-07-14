import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { NavireService } from 'src/app/main/core/services/navire/navire.service';
import { Navire } from 'src/app/main/core/models/navire/navire.model';
import { PageEvent } from '@angular/material/paginator';
import { DialogComponent, DialogModel } from 'src/app/main/shared/component/dialog/dialog.component';
import { SnackbarComponent } from 'src/app/main/shared/component/snackbar/snackbar.component';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';




@Component({
  selector: 'app-list-navire',
  templateUrl: './list-navire.component.html',
  styleUrls: ['./list-navire.component.scss'],

})
export class ListNavireComponent implements OnInit {

  panelOpenState = true;
  numCmdId: string;
  displayedColumns: string[] = ['numeroEscale', 'nomNavire', 'numeroLloyd', 'typeNavire', 'dateArriveeEstimative'];
  data: any = [];
  pageSize: number;
  pageIndex: number;
  dataLength: number;
  navireFilter: FormGroup;

  constructor(private route: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public navService: NavireService,
    public cmdService: CommandeService,) { }

  ngOnInit(): void {
    this.createForm();
    this.navService.filterNavire(this.navireFilter.value.numeroEscale, this.navireFilter.value.nomNavire, this.navireFilter.value.numeroLloyd, 0, 5).subscribe(
      result => {
        this.data = new MatTableDataSource<Navire>(result['content']);
        this.dataLength = result["totalElements"]
      }
    )
  } 

  createForm() {
    this.navireFilter = this.fb.group({
      numeroEscale: [''],
      nomNavire: [''],
      numeroLloyd: ['']
    })
  }

  resetForm() {
    this.navireFilter = this.fb.group({
      numeroEscale: [''],
      nomNavire: [''],
      numeroLloyd: ['']
    })
  }

  filterNavires() {
     
      this.navService.filterNavire(this.navireFilter.value.numeroEscale, this.navireFilter.value.nomNavire, this.navireFilter.value.numeroLloyd, 0, 5).subscribe(
        result => {
          this.data = new MatTableDataSource<Navire>(result['content']);
          this.dataLength = result["totalElements"]
        }
      )
    
  }

  onclick(nomNavire: string, escale: number) {
    const dialogData = new DialogModel(`Message de confirmation`, `Voulez-vous générer la commande pour l'escale N: <p class="font-bold inline"> ${escale} </p>? `, { name: 'heroicons_outline:information-circle', color: 'warning' });
    const dialogRef = this.dialog.open(DialogComponent, {
      maxWidth: "500px",
      panelClass: 'navireDialog',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.cmdService.generateCmd(escale).subscribe(
          (result) => {
            this.route.navigateByUrl("navire/cmd/" + result.numeroCmd)
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 2000,
              data: { message: 'Vous avez généré la commande avec succés', icon: 'heroicons_outline:check-circle' },
              verticalPosition: "top",
              panelClass: ['green-snackbar']
            })
          },
          (error)=> {
            this.snackBar.openFromComponent(SnackbarComponent, {
              duration: 2000,
              data: { message: 'Error '+ error.status + ': '+error.error.message, icon: 'heroicons_outline:information-circle' },
              verticalPosition: "top",
              panelClass: ['yellow-snackbar']
            })
            //console.log(error.error.message);

          }
        )
      }
    });
  };

  onPageChange(event: PageEvent) {
    let pageSize = event.pageSize;
    let pageIndex = event.pageIndex;
    this.navService.filterNavire(this.navireFilter.value.numeroEscale, this.navireFilter.value.nomNavire, this.navireFilter.value.numeroLloyd, pageIndex, pageSize).subscribe(
      result => {
        this.data = new MatTableDataSource<Navire>(result['content']);
        this.dataLength = result["totalElements"]
      }
    )
  }
}
