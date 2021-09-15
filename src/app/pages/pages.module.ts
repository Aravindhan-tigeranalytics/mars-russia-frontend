import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';

// Components
import { ComponentModule } from '@components/components.module';

// Pages
import { PromoScenarioBuilderComponent } from './promo-scenario-builder/promo-scenario-builder.component';
import { PromoOptimizerComponent } from './promo-optimizer/promo-optimizer.component';
import { PricingToolComponent } from './pricing-tool/pricing-tool.component';
import { PromoToolComponent } from './promo-tool/promo-tool.component';
import { PricingScenarioBuilderComponent } from './pricing-scenario-builder/pricing-scenario-builder.component';

@NgModule({
    imports: [ComponentModule, AppRoutingModule],
    declarations: [PromoScenarioBuilderComponent, PromoOptimizerComponent, PricingToolComponent, PromoToolComponent, PricingScenarioBuilderComponent],
    exports: [PromoScenarioBuilderComponent, PromoOptimizerComponent, PricingToolComponent],
})
export class PagesModule {}
