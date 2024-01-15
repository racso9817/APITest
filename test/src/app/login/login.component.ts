import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup

  get usernameControl() {
    return this.form.controls['username'] as FormControl
  }

  get passwordControl() {
    return this.form.controls['password'] as FormControl
  }

  constructor(private fb: FormBuilder, private router: Router, public login: LoginService) { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    try{
      this.login.login(this.usernameControl.value, this.passwordControl.value).subscribe(
        (data) => {        
          if (data['status']) {
            localStorage.setItem('token', data['access_token'])
            this.router.navigate(['/home'])
          } else {
            alert(data['msg'])
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

}
