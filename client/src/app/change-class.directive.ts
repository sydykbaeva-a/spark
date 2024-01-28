import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[changeClass]',
})
export class ChangeClassDirective implements OnInit {
  @Input('changeClass')
  changeClass!: string | string[];

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setAndRemoveClass(this.changeClass);
  }

  setAndRemoveClass(classNames: string | string[]) {
    const classes = Array.isArray(classNames) ? classNames : [classNames];

    classes.forEach((className) => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });

    setTimeout(() => {
      classes.forEach((className) => {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      });
    }, 700);
  }
}
