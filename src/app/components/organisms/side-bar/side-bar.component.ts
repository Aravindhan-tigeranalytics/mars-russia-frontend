import { Component, OnInit } from '@angular/core';
import{AuthService } from "@core/services"
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@core/models';

@Component({
    selector: 'nwn-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
    user$ : Observable<User>
    constructor(private authService : AuthService,private router: Router){

    }
    ngOnInit(){
        this.user$ = this.authService.getUser()
    }


    logout(){
this.authService.logout().subscribe(data=>{
     localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.authService.isLoggedInObservable.next(false);
    this.authService.setUser(null as any)
    this.router.navigate(['/login'])
})

    }
}
