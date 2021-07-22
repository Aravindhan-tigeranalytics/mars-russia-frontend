import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
    selector: 'nwn-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input()
    id!: string;
    private element: any;

    constructor(private modalService: ModalService, el: ElementRef) {
        this.id = '';
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        console.log("modal component init")
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', (el: { target: { className: string } }) => {
            console.log("modal component click close")
            console.log("modal component click close target",el.target.className)
            if (el.target.className === 'nwn-modal-bg') {
                this.close();
                // document.body.classList.add('nwn-modal-open');
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        console.log("modal component click close destroying")
        console.log("destroying" , this.id)
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        console.log("modal component open")
        this.element.style.display = 'block';
        document.body.classList.add('nwn-modal-open');
    }

    // close modal
    close(): void {
        this.modalService.remove_last_modal()
        console.log("modal component click close claose()")
        this.element.style.display = 'none';
        let opened = this.modalService.get_opened_modal()
        console.log(opened , "opened remainig..")
        if(opened.length==0){
            document.body.classList.remove('nwn-modal-open');

        }
       
    }
}
