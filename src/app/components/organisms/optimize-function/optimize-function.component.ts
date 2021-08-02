import { Component , Output , EventEmitter } from '@angular/core';

@Component({
    selector: 'nwn-optimize-function',
    templateUrl: './optimize-function.component.html',
    styleUrls: ['./optimize-function.component.css'],
})
export class OptimizeFunctionComponent {

    @Output()
    objectiveEvent = new EventEmitter()

objective_function = ['Maximize MAC' ,'Maximize RP' , 'Minimize TE']

selectObjective(objective){
    this.objectiveEvent.emit(objective)
    console.log(objective , "objective function")
}

}
