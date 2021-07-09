import { Component, Input } from '@angular/core';

@Component({
    selector: 'nwn-loaded-scenarioitem',
    templateUrl: './loaded-scenarioitem.component.html',
    styleUrls: ['./loaded-scenarioitem.component.css'],
})
export class LoadedScenarioitemComponent {
    @Input()
    title: string = 'Untitled scenario';
}
