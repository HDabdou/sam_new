import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'app/services/patient.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {
  etap = 1;
  tel;
  adresse;
  prenom;
  nom;
  message;
  errorTel = "";
  errorMessage = 0;
  loading:boolean = false;
  idP
  constructor(private _servicePatient:PatientService) { }
  public tableData1: TableData;
  public tableData2: TableData;
  savePatient(){
    this.loading = true;
    this.errorMessage = 0;
    this.errorTel = "";
    if(this.checkNumber(this.tel)){
      this.errorTel = "";
      console.log({telephone:this.tel,adresse:this.adresse,prenom:this.prenom,nom:this.nom})
      this._servicePatient.createMedecin({telephone:this.tel,adresse:this.adresse,prenom:this.prenom,nom:this.nom,depends_on:JSON.parse(localStorage.getItem("user")).id,access_level:1}).then(res=>{
        console.log(res);
        if(res['status'] == 1){
          if(res['aleadyExiste'] == 1){
            this.errorMessage = 2;
            this.prenom = undefined;
            this.nom = undefined;
            this.adresse = undefined;
            this.tel = undefined;
            this.loading = false;
          }else{
            this.errorMessage = 1;
            this.prenom = undefined;
            this.nom = undefined;
            this.adresse = undefined;
            this.tel = undefined;
            this.loading = false;
          }
        }else{
          this.errorMessage = -1;
          this.prenom = undefined;
          this.nom = undefined;
          this.adresse = undefined;
          this.tel = undefined;
          this.loading = false;
        }
      })
    }else{
      console.log("error phone number")
      this.errorTel = "Error le numéro doit être au format Ex: 77 000 00 00"
    }
    
  }
  checkNumber(arg){
    let temp = arg.replaceAll(" ","");
    console.log(temp);
    let phoneNumber = temp.split("")
    console.log(phoneNumber);
    if(phoneNumber.length != 9 ){
      console.log("phoneNumber != 9");
      return false;
    }else{
      console.log("phoneNumber == 9");
      for(let j of phoneNumber){
        console.log(j);
        if(this.isNumber(j) == false){
          return false;
        }
      }
      return true;''
      
    }
  }
  isNumber(arg){
    let numbers = ["0","1","2","3","4","5","6","7","8","9"];
    for(let i of numbers){
      if(i == arg){
        return true;
      }
    }
    return false;
  }
  @ViewChild('discussions') public discussions:ModalDirective;
  public hidediscussions():void {
    this.discussions.hide();
  }
  public showdiscussions():void {
    this.discussions.show();
  }
  patients = [ ]
  nbrPatients
  chatMessage =[]
  displayDate(date){
    return date.split(".")[0].replaceAll("T"," ")
    let dd = ((new Date()).toJSON()).split("T",2)[0];
    if(date != ""){
      let d = date.split(" ")[0];
      if(dd == d){
        return "à "+date.split(" ")[1];
      }else{
        return d.split('-')[2]+"-"+d.split('-')[1]+"-"+d.split('-')[0]+" "+date.split(" ")[1];
      }
      
    }
  }
  type = "r"
  getChats(arg){
    this._servicePatient.getMedecinChat({idM:JSON.parse(localStorage.getItem('user')).id,idP:arg}).then(res =>{
      console.log(res)
      if(res['status'] == 1){
        this.discussions1 = res['chats']
        console.log(this.discussions1)
      }
    })
  }
  sendResponse(){
    
    this._servicePatient.createDocument({medecin_id:JSON.parse(localStorage.getItem('user')).id,patient_id:this.idP,sender:JSON.parse(localStorage.getItem('user')).id,type_document:"text",document:this.message}).then(res=>{
      console.log(res);
      if(res['status'] == 1){
        
        this._servicePatient.getPatient({depends_on:JSON.parse(localStorage.getItem('user')).id}).then(res=>{
          console.log(res)
          this.discussions = res['chats']
          this.message = "";
          this.getChats(this.idP)
        })
      }else{
        
      }
  
    })
  }
  idM;
  discussions1
  ngOnInit(){
    this.idM = JSON.parse(localStorage.getItem('user')).id
    this.nbrPatients = this.patients.length
    console.log(this.idM)
    this._servicePatient.getMedecinByMedecin({depends_on:JSON.parse(localStorage.getItem('user')).id}).then(res=>{
      console.log(res)
      this.patients = res['users'];
      this.nbrPatients = this.patients.length
    })
   
      this.tableData1 = {
          headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],
          dataRows: [
              ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
              ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
              ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
              ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
              ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
              ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
          ]
      };
      this.tableData2 = {
          headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
          dataRows: [
              ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
              ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
              ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
              ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
              ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
              ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
          ]
      };
  }


}
