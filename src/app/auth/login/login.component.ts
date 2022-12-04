import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;

  invalidCredentials = false;

  constructor (public authService: AuthService){}

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        if (authStatus === false) {
          this.invalidCredentials = true;
          console.log(this.invalidCredentials)
        }
        else {
          this.invalidCredentials = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }


  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.authService.login(loginForm.value.email, loginForm.value.password);
  }
}
