import { NgModule } from '@angular/core';
import { RouterModule, Routes,PreloadAllModules  } from '@angular/router';

// Pages
import { PromoToolComponent } from '@pages/promo-tool/promo-tool.component';
import { PromoScenarioBuilderComponent } from '@pages/promo-scenario-builder/promo-scenario-builder.component';
import { PromoOptimizerComponent } from '@pages/promo-optimizer/promo-optimizer.component';
import { PricingToolComponent } from '@pages/pricing-tool/pricing-tool.component';
import {AuthGuard} from "@core/services"

// Routes
// const routes: Routes = [
//     {
//         path: '',
//         redirectTo: '/promo-tool/promo-scenario-builder',
//         pathMatch: 'full',
//     },
//     {
//         path: 'promo-tool',
//         component: PromoToolComponent,
//         children: [
//             {
//                 path: 'promo-scenario-builder',
//                 component: PromoScenarioBuilderComponent,
//             },
//             {
//                 path: 'promo-optimizer',
//                 component: PromoOptimizerComponent,
//             },
//         ],
//     },
//     {
//         path: 'pricing-tool',
//         component: PricingToolComponent,
//     },
// ];


const routes: Routes = [

    {
        path: 'promo',
        component: PromoToolComponent,
        canActivate: [AuthGuard],
        // loadChildren: () => import
        children: [
            {
                path: 'simulator',
                component: PromoScenarioBuilderComponent
            },
            {
                path: 'optimizer',
                component: PromoOptimizerComponent
            },
            { path: "", redirectTo: "simulator", pathMatch: "full" }
        ]
    },
    {
        path: 'profit',
        component: PricingToolComponent
    },
    {
        path: 'pricing',
        component: PricingToolComponent
    },
    {
        path: 'srm',
        component: PricingToolComponent
    },
    {
        path: '',
        redirectTo: '/promo/simulator',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login',
        pathMatch: 'full'
    }
    // {
    //     path: '',
        // component:PromoToolComponent,
        // children : [
        //     {
                
        //         path: 'promo-scenario-builder',
        //         component: PromoScenarioBuilderComponent,
        //     },
        //     { path: "", redirectTo: "promo-scenario-builder", pathMatch: "full" }

        // ]
        
    // },
    // {
    //     path: 'promo-tool',
    //     component: PromoToolComponent,
    //     children: [
    //         {
    //             path: 'promo-scenario-builder',
    //             component: PromoScenarioBuilderComponent,
    //         },
    //         {
    //             path: 'promo-optimizer',
    //             component: PromoOptimizerComponent,
    //         },
    //         { path: "", redirectTo: "list", pathMatch: "full" }
    //     ],
    // },
    // {
    //     path: 'pricing-tool',
    //     component: PricingToolComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{
        enableTracing:true
        // preload all modules; optionally we could
        // implement a custom preloading strategy for just some
        // of the modules (PRs welcome 😉)
        // preloadingStrategy: PreloadAllModules,
        // relativeLinkResolution: 'legacy'
    })],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule {}
