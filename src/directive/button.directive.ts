import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective {
  @Input() defaultColor: string = 'blue';
  @Input() hoverColor: string = 'lightblue';

  constructor(private el: ElementRef) {
    this.setStyle(this.defaultColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setStyle(this.hoverColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setStyle(this.defaultColor);
  }

  private setStyle(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = 'white';
    this.el.nativeElement.style.border = 'none';
    this.el.nativeElement.style.padding = '10px 20px';
    this.el.nativeElement.style.cursor = 'pointer';
    this.el.nativeElement.style.borderRadius = '5px';
  }
}
