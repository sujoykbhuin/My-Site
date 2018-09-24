import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tableeditValue: any;
  dontShowSubmit = false;
  table2 =[];
  showTable = false;
  firstname ;lastname ;email ;phone  ; date ; password;
  @ViewChild('testForm') testForm:NgForm;
  constructor() { }

  ngOnInit() {
    const valueFormlocal = JSON.parse(localStorage.getItem('table'))
    console.log(valueFormlocal)
    if(valueFormlocal !== null){
      this.table2  =valueFormlocal;
      
    }else{
      this.table2=[]

    }
  
  }

  getFromData =(value)=>{
     let tableValue = value.value;
     console.log(tableValue);
     
     if(this.dontShowSubmit){
      this.table2.forEach((data,i)=>{
        if(this.tableeditValue.phone === data.phone){
          this.table2.splice(i,1);
        }
      })
      alert('Updated Successfully');
      
     }else{
      alert('Registration successful');

     }
     this.table2.push(tableValue);
     console.log(this.table2)
     window.localStorage.setItem('table',JSON.stringify(this.table2));
     this.showTableChnage();
  }

  submit(){

  }
  editData(table){
    console.log(this.table2);
    this.tableeditValue = table;
    this.dontShowSubmit = true;
    this.firstname = table.firstname;
    this.lastname = table.lastname;
    this.phone = table.phone;
    this.email = table.email;
    this.date = table.date;
    this.password = table.password;
    this.showTable = !this.showTable;
    
    
  }

  /**
   * @description this method is use to delete the selected row 
   * @param editValue 
   */
deleteTable(table){
  const confirms = confirm('are you sure you want to delete this row?');
    if(confirms){
      this.table2.forEach((data,i)=>{
        if(table.phone === data.phone){
          this.table2.splice(i,1);
        }
      })
      window.localStorage.setItem('table', JSON.stringify(this.table2));
      alert('Deleted Successfully');
    }else{
      return;
    }
   
}
  showTableChnage(){
    this.showTable=!this.showTable;
    this.testForm.reset();
  }
  flipForm(){
    this.dontShowSubmit =false;
    this.showTable = !this.showTable;
  }
}
