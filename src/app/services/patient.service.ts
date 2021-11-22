import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private url = "http://164.68.102.126/hamid/backendShareDocument/public/index.php";

  private header :HttpHeaders;
 
  constructor(private http: HttpClient) {
    //this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.header = new HttpHeaders({'Content-Type': 'application/json'});

   }
   
   // CreateUser est une fonction de création des utilisateurs : Vérificatteur, Opérateur et client
   public createPatient(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/sam/createPatient";
    return this.http.post(link,JSON.stringify(param),{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public createMedecin(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/sam/createPatient";
    return this.http.post(link,JSON.stringify(param),{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }
  // CreateUser est une fonction de création des utilisateurs : Vérificatteur, Opérateur et client
  public getPatient(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/sam/getPatientByMedecin";
    return this.http.post(link,JSON.stringify(param),{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public getMedecinChat(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/sam/getMedecinChat";
    return this.http.post(link,JSON.stringify(param),{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public createDocument(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/sam/createDocument";
    return this.http.post(link,JSON.stringify(param),{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }
  public getMedecinByMedecin(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/sam/getMedecinByMedecin";
    return this.http.post(link,JSON.stringify(param),{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  }
}
