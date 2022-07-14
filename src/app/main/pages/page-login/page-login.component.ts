import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {AppDataState} from "../../../core/state/app-data.state";
import {ProfileType} from "../../core/models/profile-type.enum";
import { SnackbarComponent } from '../../shared/component/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

class User {
  constructor( ){}
  public username : string;
  public password : string;
  public profile: ProfileType;
  public permissions : string[];

   toStr() : string  {
    return `{"username":"${this.username}","password":"${this.password}","profile":"${this.profile}"}` ;
  }
}

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit  {
  //user$:Observable<AppDataState<User[]>> | null = null ;
  public form:FormGroup ;
  public hide: boolean = true;
  public user : User = new User( );




  constructor(private fb:FormBuilder , private router:Router,public snackBar: MatSnackBar,) {
    this.createFormGroup();

  }

  createFormGroup(){
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: [null , [Validators.required, Validators.minLength(5)]]
    })
  }

  ngOnInit(): void {

    // this.tokenStorage.signOut();
  }

  onSubmit(): void {
    if(!this.form.invalid){
       localStorage.clear();
       this.user.username = this.form.get('username')?.value;
       this.user.password = this.form.get('password')?.value;
       if (this.user.username == 'admin' && this.user.password == 'admin') {
        this.user.permissions = ['Administration','Validation','Envoi','Annulation','Upload','ApprobationValidation','ApprobationAnnulation', 'Sending','Annuler']
        console.log('hello admin');  
        localStorage.setItem("permissions",JSON.stringify(this.user.permissions))
        localStorage.setItem("profil","Administrateur") 
        this.router.navigateByUrl('/dashboard') ;         
       }
       else if (this.user.username == 'prefacturation' && this.user.password == 'prefacturation') {
        this.user.permissions = ['Validation', 'Sending','Annuler']
        console.log('hello prefacturation');  
        localStorage.setItem("permissions",JSON.stringify(this.user.permissions))  
        localStorage.setItem("profil","Préfacturation") 
        this.router.navigateByUrl('/dashboard') ;  
       }
       else if (this.user.username == 'resprefacturation' && this.user.password == 'resprefacturation') {
        this.user.permissions = ['ApprobationCancel','ApprobationAnnulation']
        console.log('hello resprefacturation');  
        localStorage.setItem("permissions",JSON.stringify(this.user.permissions))  
        localStorage.setItem("profil","Responsable de préfacturation") 
        this.router.navigateByUrl('/dashboard') ;  
       }  
       else if (this.user.username == 'facturation' && this.user.password == 'facturation') {
        this.user.permissions = ['ApprobationAnnulation','Annuler']
        console.log('hello facturation');     
        localStorage.setItem("permissions",JSON.stringify(this.user.permissions)) 
        localStorage.setItem("profil","Facturation") 
        this.router.navigateByUrl('/dashboard') ;
       }
       else if (this.user.username == 'directeur' && this.user.password == 'directeur') {
        this.user.permissions = ['Administration','Validation','Envoi']
        console.log('hello directeur');     
        localStorage.setItem("permissions",JSON.stringify(this.user.permissions)) 
        localStorage.setItem("profil","Directeur");
        this.router.navigateByUrl('/dashboard') ;
       }
       else {
        this.snackBar.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: { message: 'Nom de compte ou mot de passe incorrect', icon: 'heroicons_outline:exclamation' },
          verticalPosition: "top",
          panelClass: ['red-snackbar']
        })
       }
        
       
       // this.user.profile = ProfileType.RESP_FACTURATION
       //window.localStorage.clear();
       //window.localStorage.setItem('user', this.user.toStr());
       // window.localStorage.setItem('')

        console.log(this.user.profile)
        console.log(this.user);
        console.log(this.form.value);
        //this.router.navigateByUrl('/home') ;
      

    }

    // this.authService.login(username, password).subscribe({
    //   next: data => {
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);
        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
       // localStorage.setItem('role' , username)
        //this.router.navigateByUrl("dashboard");
      // // },
      // error: err => {
      //   this.errorMessage = err.error.message;
      //   this.isLoginFailed = true;
      // }
    // });

  }
  reloadPage(): void {
   // window.location.reload();
  }

}
