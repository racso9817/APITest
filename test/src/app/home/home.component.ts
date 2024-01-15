import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private login: LoginService) { }

  onLogout() {
    try {
      this.login.logout().subscribe((data)=>{
        if(data.status){
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
