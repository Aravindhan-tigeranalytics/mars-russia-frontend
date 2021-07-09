// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

// Import all components used
import { SvgIconComponent } from '@atoms/svg-icon/svg-icon.component';

// Import Menu Item
import { StatusBarComponent } from './status-bar.component';

// Define component
export default {
    title: 'Molecules/StatusBar',
    component: StatusBarComponent,
    // Position the component to the center as otherwise we have set a global fullscreen layout to avoid default padding provided by SB6
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
            // Declare all components used here including the actual component
            declarations: [StatusBarComponent, SvgIconComponent],
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
const StatusBarTemplate: Story<StatusBarComponent> = (args: StatusBarComponent) => ({
    props: { ...args },
    template: `<nwn-status-bar>Yet to be simulated</nwn-status-bar>`,
});

//  Primary button
export const StatusBar = StatusBarTemplate.bind({});
StatusBar.storyName = 'Status Bar';
StatusBar.args = {};
