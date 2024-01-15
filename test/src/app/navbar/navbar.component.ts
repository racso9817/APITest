import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

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
