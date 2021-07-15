// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';
import { ButtonComponent } from '@atoms/button/button.component';
import { CheckboxComponent } from '@atoms/checkbox/checkbox.component';

// Import Menu Item
import { ScenarioLoadCardComponent } from './scenario-load-card.component';

// Define component
export default {
    title: 'Molecules/ScenarioLoadCard',
    component: ScenarioLoadCardComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'centered',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [ScenarioLoadCardComponent, SvgIconComponent, ButtonComponent, CheckboxComponent],
        }),
    ],
    // Define control types
    argTypes: {
        class: { control: 'text' },
        icons: { control: 'select' },
    },
} as Meta;

// Define template
// primary button template
const ScenarioLoadCardTemplate: Story<ScenarioLoadCardComponent> = (args: ScenarioLoadCardComponent) => ({
    props: { ...args },
    template: `<div class="w-[650px]"><nwn-scenario-load-card [hideInfo]="false"
    [hideTrash]="true"
    [hideCheckbox]="true"></nwn-scenario-load-card></div>`,
});

//  Primary button
export const ScenarioLoadCard = ScenarioLoadCardTemplate.bind({});
ScenarioLoadCard.storyName = 'Scenario Load Card';
ScenarioLoadCard.args = {};
