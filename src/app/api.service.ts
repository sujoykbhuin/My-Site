import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }
  /**
   * @description this method fetch all the traveller
   */
  fetchTravellers = () => {
    console.log('fetch')
    return this.httpClient.get('https://zingotesting.azurewebsites.net/api/Travellers');
  }

  createTraveller = (user) => {
    const users = {
      'FirstName': user.FirstName,
      'MiddleName': user.MiddleName,
      'LastName': user.LastName,
      'Gender': user.Gender,
      'Email': user.Email,
      'PhoneNumber': user.PhoneNumber,
      'Address': user.Address,
      'PinCode': user.PinCode,
      'PlaceName': user.PlaceName,
      'Nationality': user.Nationality,
    }
    return this.httpClient.post('https://zingotesting.azurewebsites.net/api/Travellers', users);
  }

  deleteTraveller = (BookingTravellerId) => {
    return this.httpClient.delete(`https://zingotesting.azurewebsites.net/api/Travellers/${BookingTravellerId}`)
  }

  updateTravellers = (BookingTravellerId, user) => {
    const users = {
      BookingTravellerId: BookingTravellerId,
      'FirstName': user.FirstName,
      'MiddleName': user.MiddleName,
      'LastName': user.LastName,
      'Gender': user.Gender,
      'Email': user.Email,
      'PhoneNumber': user.PhoneNumber,
      'Address': user.Address,
      'PinCode': user.PinCode,
      'PlaceName': user.PlaceName,
      'Nationality': user.Nationality,
    }
    return this.httpClient.put(`http://zingotesting.azurewebsites.net/api/Travellers/${BookingTravellerId}`, users)
  }

}
