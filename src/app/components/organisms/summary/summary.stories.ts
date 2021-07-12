// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { SimulatedFilterItemComponent } from '@atoms/simulated-filter-item/simulated-filter-item.component';
import { SummaryPlaceholderComponent } from '@molecules/summary-placeholder/summary-placeholder.component';

import { FilterItemComponent } from '@molecules/filter-item/filter-item.component';
import { LoadedScenarioitemComponent } from '@molecules/loaded-scenarioitem/loaded-scenarioitem.component';
import { PromoElasticityComponent } from '@molecules/promo-elasticity/promo-elasticity.component';

// Import Menu Item
import { SummaryComponent } from './summary.component';

// Define component
export default {
    title: 'Organisms/SummaryComponent',
    component: SummaryComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [
                SummaryComponent,
                SummaryPlaceholderComponent,
                SvgIconComponent,
                ButtonComponent,
                FilterItemComponent,
                LoadedScenarioitemComponent,
                PromoElasticityComponent,
                SimulatedFilterItemComponent,
            ],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
    },
} as Meta;

// Define template
// Summary Component
const SummaryComponentSectionTemplate: Story<SummaryComponent> = (args: SummaryComponent) => ({
    props: { ...args },
    template: `<nwn-summary></nwn-summary>`,
});

export const SummaryComponentSection = SummaryComponentSectionTemplate.bind({});
SummaryComponentSection.storyName = 'Summary Component';
SummaryComponentSection.args = {};
