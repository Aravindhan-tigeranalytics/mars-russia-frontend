import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module"
// Components
import { ComponentModule } from '@components/components.module';

// Pages
import { PromoScenarioBuilderComponent } from './promo-scenario-builder/promo-scenario-builder.component';

@NgModule({
    imports: [CommonModule,ComponentModule,SharedModule],
    declarations: [PromoScenarioBuilderComponent],
    exports: [PromoScenarioBuilderComponent],
})
export class PagesModule {}
