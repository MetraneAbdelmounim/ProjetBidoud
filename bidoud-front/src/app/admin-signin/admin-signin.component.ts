import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onSignIn(f: NgForm) {
    if(f.valid){
      this.loginService.signIn(f.value['username'],f.value['password'])
    }
  }
}
