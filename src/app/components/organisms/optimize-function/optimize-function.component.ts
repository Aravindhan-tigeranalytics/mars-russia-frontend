import { Component , Output , EventEmitter } from '@angular/core';

@Component({
    selector: 'nwn-optimize-function',
    templateUrl: './optimize-function.component.html',
    styleUrls: ['./optimize-function.component.css'],
})
export class OptimizeFunctionComponent {
    objective_value:any = null

    @Output()
    objectiveEvent = new EventEmitter()

objective_function = ['Maximize MAC' ,'Maximize RP' , 'Minimize TE']

selectObjective(objective){
    this.objective_value = objective
    this.objectiveEvent.emit(objective)
    // console.log(objective , "objective function")
}
apply(){
    this.objectiveEvent.emit(this.objective_value)

}

}
