import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Component
import { ComponentModule } from '@components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

// Pages
import { PagesModule } from '@pages/pages.module';
import {CoreModule} from "./core/core.module"

import {SharedModule} from "./shared/shared.module"
import {AuthModule} from "./auth/auth.module"
// import {AuthRoutingModule} from "./auth/auth-routing.module"
import {
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderConfig,
    SPINNER,
    POSITION,
    PB_DIRECTION,
  } from "ngx-ui-loader";

  const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    fgsColor: '#F4F4F5',
    logoUrl: "assets/favicons/loader-logo.jpg",
    logoPosition: "center-center",
    logoSize: 90,
    fgsPosition: POSITION.centerCenter,
    pbDirection: PB_DIRECTION.leftToRight,
    fgsSize: 40,
    fgsType: SPINNER.squareJellyBox,
    pbThickness: 5,
  };

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule, 
        AppRoutingModule, 
        AuthModule,
        // AuthRoutingModule,
        ComponentModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added 
        PagesModule,CoreModule, 
        SharedModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        NgxUiLoaderHttpModule.forRoot({ showForeground: true })
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
