// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
// Atoms
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { LinkComponent } from '@atoms/link/link.component';
// Molecules
import { MenuItemComponent } from '@molecules/menu-item/menu-item.component';
import { StatusBarComponent } from '@molecules/status-bar/status-bar.component';
import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { PromotoolTabComponent } from '@molecules/promotool-tab/promotool-tab.component';
import { LoadedScenarioControlsComponent } from '@molecules/loaded-scenario-controls/loaded-scenario-controls.component';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
// Organisms
import { HeaderComponent } from '@organisms/header/header.component';
import { LoadedScenarioHeaderComponent } from '@organisms/loaded-scenario-header/loaded-scenario-header.component';
import { SideMenuComponent } from '@organisms/side-menu/side-menu.component';
import { SideBarComponent } from '@organisms/side-bar/side-bar.component';

// Import the actual component
import { PromoScenarioBuilderComponent } from './promo-scenario-builder.component';

// Define component
export default {
    title: 'Pages/PromoScenarioBuilder',
    component: PromoScenarioBuilderComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                // Atoms
                ButtonComponent,
                LinkComponent,
                SvgIconComponent,
                // Molecules
                MenuItemComponent,
                StatusBarComponent,
                PromotoolTabComponent,
                FilterItemComponent,
                LoadedScenarioControlsComponent,
                LoadedScenarioitemComponent,
                PromoElasticityComponent,
                // Organisms
                HeaderComponent,
                LoadedScenarioHeaderComponent,
                SideMenuComponent,
                SideBarComponent,
                // Page
                PromoScenarioBuilderComponent,
            ],
        }),
    ],
    // Define control types
    // No arguments for this component
} as Meta;

// Define template
const PromoScenarioBuilderTemplate: Story<PromoScenarioBuilderComponent> = (args: PromoScenarioBuilderComponent) => ({
    props: { ...args },
    template: `<nwn-promo-scenario-builder></nwn-promo-scenario-builder>`,
});

// Create an instances of the component
export const PromoScenarioBuilder = PromoScenarioBuilderTemplate.bind({});
PromoScenarioBuilder.storyName = 'Promo Scenario Builder page';
