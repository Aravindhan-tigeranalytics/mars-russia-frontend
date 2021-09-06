import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nwn-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectPage(url: any){
    if(url == 'pricing-tool'){
      window.open("https://mars-tool.azurewebsites.net/", '_blank')
    }
    else if(url == 'promo-tool'){
      this.router.navigate(['/promo'])
    }
    else if(url == 'profit-tool'){
      this.router.navigate(['/profit'])
    }
    else if(url == 'pricing-capabilities'){
      this.router.navigate(['/pricing'])
    }
    else if(url == 'srm-insight'){
      this.router.navigate(['/srm'])
    }
 }

}