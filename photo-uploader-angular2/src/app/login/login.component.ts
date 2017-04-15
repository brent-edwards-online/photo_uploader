import { Component, OnInit } from '@angular/core';
import { LoginParams } from '../models/login-params.model';
import { NgForm } from "@angular/forms"
import { AuthenticationService } from "../service/authentication.service";
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginParams = new LoginParams();
  emailRegEx ="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  isSignedIn: boolean;
  errorMessage: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  continueAsGuest() {
    this.loginParams.email = "guest@guest.com";
    this.loginParams.password = "GU3$Tl@g1n";
    this.login();
  }

  login() {
    this.authenticationService.login(this.loginParams.email, this.loginParams.password)
            .subscribe(
            () => {
                this.isSignedIn = true;
                this.router.navigate(['/uploader']);
            },
            (error: any) => {
                this.isSignedIn = false;
                // Checks for error in response (error from the Token endpoint).
                if (error._body != "") {
                    let body: any = error.json();

                    switch (body.error) {
                        case "invalid_grant":
                            this.errorMessage = "Invalid email or password";
                            break;
                        default:
                            this.errorMessage = "Unexpected error. Try again";
                    }
                } else {
                    this.isSignedIn = false;
                    let errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                    console.log(errMsg);
                    this.errorMessage = "Server error. Try again later.";
                }
            });
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }
}
