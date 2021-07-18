import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { PromoToolComponent } from '@pages/promo-tool/promo-tool.component';
import { PromoScenarioBuilderComponent } from '@pages/promo-scenario-builder/promo-scenario-builder.component';
import { PromoOptimizerComponent } from '@pages/promo-optimizer/promo-optimizer.component';
import { PricingToolComponent } from '@pages/pricing-tool/pricing-tool.component';

// Routes
const routes: Routes = [
    {
        path: '',
        redirectTo: '/promo-tool/promo-scenario-builder',
        pathMatch: 'full',
    },
    {
        path: 'promo-tool',
        component: PromoToolComponent,
        children: [
            {
                path: 'promo-scenario-builder',
                component: PromoScenarioBuilderComponent,
            },
            {
                path: 'promo-optimizer',
                component: PromoOptimizerComponent,
            },
        ],
    },
    {
        path: 'pricing-tool',
        component: PricingToolComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule {}
