import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[qScore]'
})
export class QScoreDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
