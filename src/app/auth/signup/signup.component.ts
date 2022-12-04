import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  invalidCredentials = false;

  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        if (authStatus === false) {
          this.invalidCredentials = true;
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

  onSignUp(form) {
    if (form.invalid) {
      return;
    }

    this.authService.createAdmin(form.value.email, form.value.password);
  }
}
