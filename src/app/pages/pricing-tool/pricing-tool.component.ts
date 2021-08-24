import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'nwn-pricing-tool',
  templateUrl: './pricing-tool.component.html',
  styleUrls: ['./pricing-tool.component.css']
})
export class PricingToolComponent implements OnInit {
  nav_url:any = null

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        console.log(val.url , "val url")
        this.nav_url = val.url
          // console.log(val, 'VAL OF ROUTER ');
          // console.log(val.url, 'VAL OF ROUTER ');
          // if (this.login_route.includes(val.url)) {
          //   // this.hideNav()
          //   this.hide_side = true;
          // } else {
          //   this.hide_side = false;
          // }
           
        }
  });
   }

  ngOnInit(): void {
  }

}
