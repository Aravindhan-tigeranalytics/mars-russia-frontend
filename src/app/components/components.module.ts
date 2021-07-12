import { NgModule } from '@angular/core';

// Atoms
import { ButtonComponent } from '@atoms/button/button.component';
import { LinkComponent } from '@atoms/link/link.component';
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { SvgIconDirective } from '@atoms/svg-icon/svg-icon.directive';
import { ToggleCtaComponent } from '@atoms/toggle-cta/toggle-cta.component';
import { SimulatedFilterItemDirective } from '@atoms/simulated-filter-item/simulated-filter-item.directive';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';

// Molecules
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { MenuItemComponent } from '@molecules/menu-item/menu-item.component';
import { MetricItemComponent } from '@molecules/metric-item/metric-item.component';
import { PromotoolTabComponent } from '@molecules/promotool-tab/promotool-tab.component';
import { StatusBarComponent } from '@molecules/status-bar/status-bar.component';
import { LoadedScenarioControlsComponent } from '@molecules/loaded-scenario-controls/loaded-scenario-controls.component';
import { LoadedScenarioExpandComponent } from '@molecules/loaded-scenario-expand/loaded-scenario-expand.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
import { StatusBarDirective } from '@molecules/status-bar/status-bar.directive';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';
import { WeeklyPromotionComponent } from '@molecules/weekly-promotion/weekly-promotion.component';
import { SummaryPlaceholderComponent } from '@molecules/summary-placeholder/summary-placeholder.component';
import { ToggleComponent } from '@molecules/toggle/toggle.component';

// Organisms
import { SideMenuComponent } from '@organisms/side-menu/side-menu.component';
import { SideBarComponent } from '@organisms/side-bar/side-bar.component';
import { HeaderComponent } from '@organisms/header/header.component';
import { LoadedScenarioHeaderComponent } from '@organisms/loaded-scenario-header/loaded-scenario-header.component';
import { SummaryComponent } from '@organisms/summary/summary.component';
import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';

@NgModule({
    imports: [],
    declarations: [
        ButtonComponent,
        LinkComponent,
        PromotoolTabComponent,
        SvgIconComponent,
        StatusBarComponent,
        MenuItemComponent,
        FilterItemComponent,
        MetricItemComponent,
        CommandHeaderComponent,
        CommandMultiselectComponent,
        CommandIconitemComponent,
        CheckboxComponent,
        SideMenuComponent,
        SideBarComponent,
        HeaderComponent,
        LoadedScenarioitemComponent,
        LoadedScenarioHeaderComponent,
        LoadedScenarioControlsComponent,
        PromoElasticityComponent,
        SvgIconDirective,
        StatusBarDirective,
        SimulatedFilterItemDirective,
        SimulatedFilterItemComponent,
        WeeklyPromotionComponent,
        SummaryComponent,
        SummaryPlaceholderComponent,
        ToggleCtaComponent,
        ToggleComponent,
        TabNavItemComponent,
        TabCtaComponent,
        LoadedScenarioExpandComponent,
    ],
    exports: [
        ButtonComponent,
        FilterItemComponent,
        SvgIconComponent,
        StatusBarComponent,
        MenuItemComponent,
        SideMenuComponent,
        SideBarComponent,
        HeaderComponent,
        PromoElasticityComponent,
        LoadedScenarioControlsComponent,
        LoadedScenarioitemComponent,
        LoadedScenarioHeaderComponent,
        SummaryComponent,
        SummaryPlaceholderComponent,
        LoadedScenarioExpandComponent,
    ],
})
export class ComponentModule {}
