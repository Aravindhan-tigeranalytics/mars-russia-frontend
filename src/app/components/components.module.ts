import { NgModule } from '@angular/core';

// Atoms
import { ButtonComponent } from '@atoms/button/button.component';
import { LinkComponent } from '@atoms/link/link.component';
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { SvgIconDirective } from '@atoms/svg-icon/svg-icon.directive';
import { DropdownComponent } from '@atoms/dropdown/dropdown.component';
import { ToggleCtaComponent } from '@atoms/toggle-cta/toggle-cta.component';
import { SimulatedFilterItemDirective } from '@atoms/simulated-filter-item/simulated-filter-item.directive';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';
import { LegendItemsComponent } from '@atoms/legend-items/legend-items.component';

// Molecules
import { SearchFooterComponent } from '@molecules/search-footer/search-footer.component';
import { CommandHeaderComponent } from '@molecules/command-header/command-header.component';
import { CommandIconitemComponent } from '@molecules/command-iconitem/command-iconitem.component';
import { CommandMultiselectComponent } from '@molecules/command-multiselect/command-multiselect.component';
import { CommandSearchComponent } from '@molecules/command-search/command-search.component';
import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { MenuItemComponent } from '@molecules/menu-item/menu-item.component';
import { MetricItemComponent } from '@molecules/metric-item/metric-item.component';
import { PromotoolTabComponent } from '@molecules/promotool-tab/promotool-tab.component';
import { StatusBarComponent } from '@molecules/status-bar/status-bar.component';
import { LoadedScenarioControlsComponent } from '@molecules/loaded-scenario-controls/loaded-scenario-controls.component';
import { LoadedScenarioExpandComponent } from '@molecules/loaded-scenario-expand/loaded-scenario-expand.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
import { FilterComponent } from '@molecules/filter/filter.component';
import { StatusBarDirective } from '@molecules/status-bar/status-bar.directive';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';
import { CellItemComponent } from '@molecules/cell-item/cell-item.component';
import { CellWeekItemComponent } from '@molecules/cell-week-item/cell-week-item.component';
import { ComparescenarioCellHeaderComponent } from '@molecules/comparescenario-cell-header/comparescenario-cell-header.component';
import { WeeklyPromotionComponent } from '@molecules/weekly-promotion/weekly-promotion.component';
import { ScenarioLoadCardComponent } from '@molecules/scenario-load-card/scenario-load-card.component';
import { SummaryPlaceholderComponent } from '@molecules/summary-placeholder/summary-placeholder.component';
import { ChartToolTipComponent } from '@molecules/chart-tool-tip/chart-tool-tip.component';
import { ToggleComponent } from '@molecules/toggle/toggle.component';

// Organisms
import { SideMenuComponent } from '@organisms/side-menu/side-menu.component';
import { SideBarComponent } from '@organisms/side-bar/side-bar.component';
import { HeaderComponent } from '@organisms/header/header.component';
import { LoadedScenarioHeaderComponent } from '@organisms/loaded-scenario-header/loaded-scenario-header.component';
import { FilterRetailerComponent } from '@organisms/filter-retailer/filter-retailer.component';
import { SummaryComponent } from '@organisms/summary/summary.component';
import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';
import { LegendItemsDirective } from './atoms/legend-items/legend-items.directive';

@NgModule({
    imports: [],
    declarations: [
        ButtonComponent,
        LinkComponent,
        CommandSearchComponent,
        PromotoolTabComponent,
        SvgIconComponent,
        StatusBarComponent,
        MenuItemComponent,
        FilterItemComponent,
        MetricItemComponent,
        CommandHeaderComponent,
        CommandMultiselectComponent,
        CommandIconitemComponent,
        SearchFooterComponent,
        CheckboxComponent,
        SideMenuComponent,
        SideBarComponent,
        HeaderComponent,
        LoadedScenarioitemComponent,
        LoadedScenarioHeaderComponent,
        LoadedScenarioControlsComponent,
        LoadedScenarioExpandComponent,
        PromoElasticityComponent,
        DropdownComponent,
        CellItemComponent,
        CellWeekItemComponent,
        ComparescenarioCellHeaderComponent,
        ScenarioLoadCardComponent,
        ChartToolTipComponent,
        FilterRetailerComponent,
        FilterComponent,
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
        LegendItemsComponent,
        LegendItemsDirective,
    ],
    exports: [
        ButtonComponent,
        SearchFooterComponent,
        FilterItemComponent,
        SvgIconComponent,
        StatusBarComponent,
        CommandSearchComponent,
        MenuItemComponent,
        SideMenuComponent,
        SideBarComponent,
        HeaderComponent,
        PromoElasticityComponent,
        LoadedScenarioControlsComponent,
        LoadedScenarioExpandComponent,
        LoadedScenarioitemComponent,
        LoadedScenarioHeaderComponent,
        SummaryComponent,
        SummaryPlaceholderComponent,
        LegendItemsComponent,
    ],
})
export class ComponentModule {}
