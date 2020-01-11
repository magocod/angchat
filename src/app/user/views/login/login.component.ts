import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import {
  AuthService,
  ICredentials,
  IDJTokenResponse
} from 'src/app/user/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 *
 */
export class LoginComponent implements OnInit {

  exampleusers: ICredentials[] = [
    { email: 'admin@django.com', password: '123' },
    { email: 'userstaff@django.com', password: '123' },
    { email: 'user@django.com', password: '123' },
  ];
  hide = true;

  checkoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService,
  ) {
    this.checkoutForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.setChangeValidate();
  }

  /**
   * [password description]
   */
  get password() {
    return this.checkoutForm.get('password');
  }

  /**
   * [email description]
   */
  get email() {
    return this.checkoutForm.get('email');
  }

  /**
   * [setChangeValidate description]
   */
  setChangeValidate(): void {
    // console.log(this.checkoutForm);
    this.checkoutForm.get('email').valueChanges.subscribe(
      (email) => {
        console.log(email);
      }
    );
    this.checkoutForm.get('password').valueChanges.subscribe(
      (password) => {
        console.log(password);
      }
    );
  }

  /**
   * [onSubmit description]
   * @param {FormControl} form [description]
   */
  onSubmit(form: FormControl): void {
    // Process checkout data here
    console.log(form);
    console.log(form.value);
    this.auth.login(form.value).subscribe((value: IDJTokenResponse) => {
      console.log(value);
      this.auth.setToken(value);
      this.checkoutForm.reset();
      this.toastr.success('...', 'Welcome');
      this.router.navigateByUrl('/chat');
    });
  }

  /**
   * [setUser description]
   * @param {number} index [description]
   */
  setUser(index: number): void {
    console.log(this.email);
    this.checkoutForm.get('email').setValue(
      this.exampleusers[index].email
    );
    this.checkoutForm.get('password').setValue(
      this.exampleusers[index].password
    );
  }

}
