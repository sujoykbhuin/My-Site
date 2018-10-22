import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => HeaderComponent),
    }
  ]
})
export class HeaderComponent implements OnInit {

  tableeditValue: any;
  dontShowSubmit = false;
  public loading = false;
  table2;
  showTable = false;
  FirstName; LastName; Email; PhoneNumber; date; password; MiddleName; Gender; Nationality; PlaceName; PinCode; Address;
  @ViewChild('testForm') testForm: NgForm;
  bookingId: any;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // const valueFormlocal = JSON.parse(localStorage.getItem('table'))
    // 
    // if (valueFormlocal !== null) {
    //   this.table2 = valueFormlocal;

    // } else {
    //   this.table2 = [];

    // }
    this.fetchTraveler();

  }

  update(tables) {


    if (tables.valid) {
      this.apiService.updateTravellers(this.bookingId, tables.value).toPromise()
        .then(data => {
          this.fetchTraveler();
          this.showTable = !this.showTable;
        })
    } else {
      alert('Please Fill correct data');
    }

  }

  fetchTraveler = () => {
    this.loading = true;
    this.apiService.fetchTravellers().subscribe(
      data => {
        this.loading = false;
        this.table2 = data;


      },
      err => this.handleError(err)
    );


  }


  editData(table) {

    this.tableeditValue = table;
    this.bookingId = table.BookingTravellerId;
    this.dontShowSubmit = true;
    this.FirstName = table.FirstName;
    this.MiddleName = table.MiddleName;
    this.LastName = table.LastName;
    this.Gender = table.Gender;
    this.PhoneNumber = table.PhoneNumber;
    this.Email = table.Email;
    this.PinCode = table.PinCode;
    this.Nationality = table.Nationality;
    this.Address = table.Address;
    this.PlaceName = table.PlaceName;
    this.showTable = !this.showTable;
  }



  /**
   * @description this method is use to delete the selected row 
   * @param editValue 
   */
  deleteTable(table) {
    const confirms = confirm('are you sure you want to delete this row?');
    if (confirms) {
      this.apiService.deleteTraveller(table.BookingTravellerId).subscribe(data => {

        this.fetchTraveler();
      });
      alert('Deleted Successfully');
    } else {
      return;
    }

  }
  showTableChnage() {
    this.showTable = !this.showTable;
    this.testForm.reset();
  }
  flipForm() {
    this.dontShowSubmit = false;
    this.showTable = !this.showTable;
    this.fetchTraveler();
  }


  handleError = (error: Error | HttpErrorResponse) => {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        alert('you are offline');
      } else {
        alert('server error came');
      }
    } else {
      alert('client error came');

    }
  }
  createTravellers = (user) => {
    this.apiService.createTraveller(user.value).toPromise()
      .then(data => {

        this.flipForm();
      });

  }
}
