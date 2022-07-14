import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { Commande } from 'src/app/main/core/models/navire/commande.model';
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-list-history-bulletin',
  templateUrl: './list-history-command.component.html',
  styleUrls: ['./list-history-command.component.scss']
})

export class ListHistoryCommandComponent implements OnInit {
  panelOpenState = true;
  displayedColumns2: string[] = ['numbc', 'cpa', 'codeC', 'nomC', 'numE', 'codeNP','longueur'];
  data: any = [];
  pageSize: number;
  pageIndex: number;
  dataLength: number;
  navireId: number;
  cmdFilter: FormGroup;



  constructor(private cmdService: CommandeService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { }



  ngOnInit(): void {
    this.createForm();
    this.navireId = this.activatedRoute.snapshot.params['id'];
    if (this.navireId) {
      this.cmdService.getAllCmd(0, 5).subscribe(
        result => {
          console.log(result);
          this.data = new MatTableDataSource<Commande>(result['content']);
          this.dataLength = result["totalElements"]
        })
    } 
    else {
      this.cmdService.getCmdHistory(0, 5).subscribe(
        result => {
          console.log(result);
          this.data = new MatTableDataSource<Commande>(result['content']);
          this.dataLength = result["totalElements"]
        })
    }
  }

  onClick(id: any) {
    this.route.navigateByUrl("/navire/historique-cmd/" + id)
  }

  onPageChange(event: PageEvent) {
    let pageSize = event.pageSize;
    let pageIndex = event.pageIndex;
    // this.pageIndex = pageIndex;
    
      this.cmdService.getCmdHistory(pageIndex,pageSize ).subscribe(
        result => {
          this.data = new MatTableDataSource<Commande>(result['content']);
          
        }
      )
    
  }

  createForm() {
    this.cmdFilter = this.fb.group({
      codeClient: [''],
      numeroEscale: [''],
      nomClient: [''],
      numeroCmd: ['']
    })
  }

  resetFilter() {
    this.cmdFilter = this.fb.group({
      codeClient: [''],
      numeroEscale: [''],
      nomClient: [''],
      numeroCmd: ['']
    })
  }

  filterCmds() {
    if (this.cmdFilter.value.codeClient == '' || this.cmdFilter.value.codeClient == null) {
      this.cmdService.getAllCmd(0, 5).subscribe(
        result => {
          this.data = new MatTableDataSource<Commande>(result['content']);
          this.dataLength = result["totalElements"]
        }
      )
    } 
    else {
      this.cmdService.filterCmd(this.cmdFilter.value.codeClient, this.cmdFilter.value.numeroEscale, this.cmdFilter.value.nomClient, 0, 5).subscribe(
        result => {
          this.data = new MatTableDataSource<Commande>(result['content']);
          this.dataLength = result["totalElements"]
          console.log(result)
        }
      )
    }
  }
}
