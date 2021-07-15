import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Atoms
import { ButtonComponent } from '@atoms/button/button.component';
import { LinkComponent } from '@atoms/link/link.component';
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';
import { SvgIconDirective } from '@atoms/svg-icon/svg-icon.directive';
import { ToggleCtaComponent } from '@atoms/toggle-cta/toggle-cta.component';
import { SimulatedFilterItemDirective } from '@atoms/simulated-filter-item/simulated-filter-item.directive';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';
import { LegendItemsComponent } from '@atoms/legend-items/legend-items.component';
import { TabCtaComponent } from '@atoms/tab-cta/tab-cta.component';
import { LegendItemsDirective } from '@atoms/legend-items/legend-items.directive';
import { CellHeaderComponent } from '@atoms/cell-header/cell-header.component';

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
import { StatusBarDirective } from '@molecules/status-bar/status-bar.directive';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';
import { CellItemComponent } from '@molecules/cell-item/cell-item.component';
import { CellWeekItemComponent } from '@molecules/cell-week-item/cell-week-item.component';
import { WeeklyPromotionComponent } from '@molecules/weekly-promotion/weekly-promotion.component';
import { ScenarioLoadCardComponent } from '@molecules/scenario-load-card/scenario-load-card.component';
import { SummaryPlaceholderComponent } from '@molecules/summary-placeholder/summary-placeholder.component';
import { ToggleComponent } from '@molecules/toggle/toggle.component';
import { TabNavItemComponent } from '@molecules/tab-nav-item/tab-nav-item.component';
import { CellItemDirective } from '@molecules/cell-item/cell-item.directive';
import { MetricItemPopupComponent } from '@molecules/metric-item-popup/metric-item-popup.component';
import { ModalComponent } from '@molecules/modal/modal.component';

// Organisms
import { SideMenuComponent } from '@organisms/side-menu/side-menu.component';
import { SideBarComponent } from '@organisms/side-bar/side-bar.component';
import { HeaderComponent } from '@organisms/header/header.component';
import { LoadedScenarioHeaderComponent } from '@organisms/loaded-scenario-header/loaded-scenario-header.component';
import { FilterRetailerComponent } from '@organisms/filter-retailer/filter-retailer.component';
import { SummaryComponent } from '@organisms/summary/summary.component';
import { FilterBasicComponent } from '@organisms/filter-basic/filter-basic.component';
import { FilterCategoriesComponent } from '@organisms/filter-categories/filter-categories.component';
import { FilterStrageticCellsComponent } from '@organisms/filter-stragetic-cells/filter-stragetic-cells.component';
import { FilterBrandsComponent } from '@organisms/filter-brands/filter-brands.component';
import { FilterBrandsFormatsComponent } from '@organisms/filter-brands-formats/filter-brands-formats.component';
import { FilterProductGroupsComponent } from '@organisms/filter-product-groups/filter-product-groups.component';
import { LoadScenarioPricingComponent } from '@organisms/load-scenario-pricing/load-scenario-pricing.component';
import { LoadScenarioPromosimulatorComponent } from '@organisms/load-scenario-promosimulator/load-scenario-promosimulator.component';
import { PricingScenarioComponent } from '@organisms/pricing-scenario/pricing-scenario.component';
import { PromoSimulatorScenarioComponent } from '@organisms/promo-simulator-scenario/promo-simulator-scenario.component';
import { LoadedPricingScenarioComponent } from '@organisms/loaded-pricing-scenario/loaded-pricing-scenario.component';
import { LoadedPromosimulatorScenarioComponent } from '@organisms/loaded-promosimulator-scenario/loaded-promosimulator-scenario.component';
import { PromoScenariobuilderPopupComponent } from '@organisms/promo-scenariobuilder-popup/promo-scenariobuilder-popup.component';
import { PromoElasticityPopupComponent } from '@organisms/promo-elasticity-popup/promo-elasticity-popup.component';
import { OpenedModalComponent } from '@organisms/opened-modal/opened-modal.component';
import { PromoOptimizerPopupComponent } from '@organisms/promo-optimizer-popup/promo-optimizer-popup.component';

@NgModule({
    imports: [CommonModule],
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
        CellItemComponent,
        CellWeekItemComponent,
        ScenarioLoadCardComponent,
        FilterRetailerComponent,
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
        FilterBasicComponent,
        CellHeaderComponent,
        CellItemDirective,
        FilterCategoriesComponent,
        FilterStrageticCellsComponent,
        FilterBrandsComponent,
        FilterBrandsFormatsComponent,
        FilterProductGroupsComponent,
        LoadScenarioPricingComponent,
        LoadScenarioPromosimulatorComponent,
        PricingScenarioComponent,
        PromoSimulatorScenarioComponent,
        MetricItemPopupComponent,
        LoadedPricingScenarioComponent,
        LoadedPromosimulatorScenarioComponent,
        PromoScenariobuilderPopupComponent,
        PromoElasticityPopupComponent,
        ModalComponent,
        OpenedModalComponent,
        PromoOptimizerPopupComponent,
    ],
    exports: [
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
        CellItemComponent,
        CellWeekItemComponent,
        ScenarioLoadCardComponent,
        FilterRetailerComponent,
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
        FilterBasicComponent,
        CellHeaderComponent,
        CellItemDirective,
        FilterCategoriesComponent,
        FilterStrageticCellsComponent,
        FilterBrandsComponent,
        FilterBrandsFormatsComponent,
        FilterProductGroupsComponent,
        LoadScenarioPricingComponent,
        LoadScenarioPromosimulatorComponent,
        PricingScenarioComponent,
        PromoSimulatorScenarioComponent,
        MetricItemPopupComponent,
        LoadedPricingScenarioComponent,
        LoadedPromosimulatorScenarioComponent,
        PromoScenariobuilderPopupComponent,
    ],
})
export class ComponentModule {}
