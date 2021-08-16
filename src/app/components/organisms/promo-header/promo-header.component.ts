import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {AuthService} from "@core/services/auth.services"
import {User} from "@core/models/user.model"
import { Observable } from 'rxjs';

@Component({
    selector: 'nwn-promo-header',
    templateUrl: './promo-header.component.html',
    styleUrls: ['./promo-header.component.css'],
})
export class PromoHeaderComponent {
    currentRoute = '';
    userdetail: User = null as any
    groups:any[] = []

    constructor(private authService: AuthService,location: Location, router: Router) {
        router.events.subscribe((val) => {
            if (location.path() != '') {
                this.currentRoute = location.path();
            } else {
                this.currentRoute = '';
            }
        });
    }

    ngOnInit() {
        this.authService.getUser().subscribe(data=>{
            console.log("user in header" , data )
            this.userdetail = data
            console.log(this.userdetail , "setting user data in header")
            // this.user.user.
            this.groups = data.user.groups.map(d=>d.name)
        })
    }
}
