import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import * as sha1 from 'js-sha1';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'sameShareDocument';
  login= undefined;
  password = undefined;
  loading:boolean = false;
  errorMessage = ""
  constructor(private router:Router,private _serviceLogin:LoginService) { }
  connexion(){
    //this.router.navigate(['/patient'])
    this.errorMessage = "";
    this.loading = true;
    console.log({login:this.login,password:this.password});
    this._serviceLogin.login({login:this.login,password:sha1(this.password)}).then(res=>{
      console.log(res)
      if(res['status'] == 1){
        this.loading = false;
        localStorage.setItem("user",JSON.stringify(res['user']))
        this.router.navigate(['/patient'])
        this.errorMessage = ""
      }else{
        this.loading = false;
        this.errorMessage = "Login ou mot de passe incorrect !!!";
      }
    })
  
     
      
    
    
  }
  ngOnInit(): void {
  }

}
