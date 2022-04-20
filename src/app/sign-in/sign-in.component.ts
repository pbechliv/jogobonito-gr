import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm = new FormGroup({
    username: new FormControl('panos.bechlivanos@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('110290pb', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signInForm.valueChanges.subscribe((value) => {
      console.log(this.signInForm);
    });
  }

  async onSubmit() {
    await this.authService.signIn(
      this.signInForm.value.email,
      this.signInForm.value.password
    );
    this.router.navigateByUrl('dashboard');
  }
}
