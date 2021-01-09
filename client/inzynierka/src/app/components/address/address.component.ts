import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Router} from '@angular/router';

class Address {
  country: string;
  province: string;
  city: string;
  shipAddress: string;
  postCode: string;
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address: Address = {
    country: '',
    province: '',
    city: '',
    shipAddress: '',
    postCode: ''
  };

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.accountService.getUserAddress()
      .subscribe(
        res => {
          console.log(res.status);
          if (res.status === 204){
            this.address.country = '';
            this.address.province = '';
            this.address.city = '';
            this.address.shipAddress = '';
            this.address.postCode = '';
          } else {

            this.address.country = res.body.address.country;
            this.address.province = res.body.address.province;
            this.address.city = res.body.address.city;
            this.address.shipAddress = res.body.address.shipAddress;
            this.address.postCode = res.body.address.postCode;
          }
          },
        err => console.log(err)
      );
  }

  updateUserAddress(): void {
    console.log(this.address);
    this.accountService.postUserAddress(this.address)
        .subscribe(
          res => {
              this.router.navigate(['address']);
          },
          err => console.log(err)
      );
  }

}
