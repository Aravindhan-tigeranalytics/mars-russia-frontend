import { NgModule } from '@angular/core';

// Components
import { ComponentModule } from '@components/components.module';

// Pages
import { PromoScenarioBuilderComponent } from './promo-scenario-builder/promo-scenario-builder.component';

@NgModule({
    imports: [ComponentModule],
    declarations: [PromoScenarioBuilderComponent],
    exports: [PromoScenarioBuilderComponent],
})
export class PagesModule {}
