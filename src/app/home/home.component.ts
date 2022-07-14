import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {NgxPermissionsService} from 'ngx-permissions';
import {User} from "../core/model/user.model";
import {ProfileType} from "../main/core/models/profile-type.enum";
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 private user: User;
 private profile: ProfileType;
  public  ls = window.localStorage.getItem('user') ;
  constructor(private router: Router) {
  }

  ngOnInit() {
      if (this.ls ) {
        this.user = JSON.parse(this.ls)
        switch (this.user.profile){
          case ProfileType.ADMINISTARATOR:
            this.router.navigateByUrl('/dashboard') ;
            break;
          case ProfileType.RESP_PREFACTURATION:
            this.router.navigateByUrl('/dashboard') ;
            break;
          case ProfileType.RESP_FACTURATION:
            this.router.navigateByUrl('/dashboard') ;
            break;
          default:
            this.router.navigateByUrl("/dashboard") ;
        }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
