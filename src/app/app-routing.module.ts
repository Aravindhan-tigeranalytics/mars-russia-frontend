import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { PromoScenarioBuilderComponent } from '@pages/promo-scenario-builder/promo-scenario-builder.component';

// Routes
const routes: Routes = [
    {
        path: '',
        component: PromoScenarioBuilderComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule {}
