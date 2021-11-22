import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://164.68.102.126/hamid/backendShareDocument/public/index.php";

  private header :HttpHeaders;
 
  constructor(private http: HttpClient) {
    //this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.header = new HttpHeaders({'Content-Type': 'application/json'});

   }
   
   // CreateUser est une fonction de création des utilisateurs : Vérificatteur, Opérateur et client
   public login(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/sam/login";
    return this.http.post(link,JSON.stringify(param),{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }
   public login1(param): Promise<any>{
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "login": param.login,
        "password": "81dc9bdb52d04dc20036dbd8313ed055",
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

       return fetch("http://164.68.102.126/hamid/backendShareDocument/public/index.php/sam/login", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error)); 
       }
}
