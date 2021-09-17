import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appScrollable]',
    exportAs: 'appScrollable',
})
export class ScrollableDirective {
    constructor(private elementRef: ElementRef) {}

    @Input() scrollUnit = 0;

    private get element() {
        return this.elementRef.nativeElement;
    }

    get isOverflow() {
        return this.element.scrollWidth > this.element.clientWidth;
    }

    scroll(direction: number) {
        this.element.scrollLeft += this.scrollUnit * direction;
    }

    get canScrollStart() {
        return this.element.scrollLeft > 0;
    }

    get canScrollEnd() {
        return this.element.scrollLeft + this.element.clientWidth != this.element.scrollWidth;
    }

    @HostListener('window:resize')
    onWindowResize() {} // required for update view when windows resized
}
