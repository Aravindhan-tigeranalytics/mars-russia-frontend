import { Component, Input, EventEmitter, Output  } from '@angular/core';

@Component({
    selector: 'nwn-command-multiselect',
    templateUrl: './command-multiselect.component.html',
    styleUrls: ['./command-multiselect.component.css'],
})
export class CommandMultiselectComponent {
    @Input()
    hideClose: boolean = false;
    @Input()
    leftBorder: boolean = false;
    @Input()
    value:any = ''
    @Input()
    checked:boolean = false
    @Output() valueChangeSelect = new EventEmitter();

    valueChange(e:any){
        this.valueChangeSelect.emit(e)
        // console.log(e , "output event value")
    }
}
