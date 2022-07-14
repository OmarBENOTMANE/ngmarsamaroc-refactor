import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/main/core/services/navire/commande.service';
import { Commande } from 'src/app/main/core/models/navire/commande.model';

@Component({
  selector: 'app-list-command',
  templateUrl: './list-command.component.html',
  styleUrls: ['./list-command.component.scss']
})
export class ListCommandComponent implements OnInit {

  searchForm: FormGroup;
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
      this.cmdService.getAllCmd(0, 5).subscribe(
        result => {
          console.log(result);
          this.data = new MatTableDataSource<Commande>(result['content']);
          this.dataLength = result["totalElements"]
        })
    }
  }

  createForm() {
    this.cmdFilter = this.fb.group({
      codeClient: [''],
      numeroEscale: [''],
      nomClient: [''],
      numeroCmd: ['']
    })
  }

  reset() {
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

  onClick(id: any) {
    this.route.navigateByUrl("/navire/cmd/" + id)
  }

  onaddCmd() {
    this.route.navigateByUrl("navire/cmd/select")
  }

  onPageChange(event: PageEvent) {
    let pageSize = event.pageSize;
    let pageIndex = event.pageIndex;
    this.pageIndex = pageIndex;
    
      this.cmdService.getAllCmd(pageIndex,pageSize ).subscribe(
        result => {
          this.data = new MatTableDataSource<Commande>(result['content']);
          this.dataLength = result["totalElements"]
        }
      )
    
  }


}
