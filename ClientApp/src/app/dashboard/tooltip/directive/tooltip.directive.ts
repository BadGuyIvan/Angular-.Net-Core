import { Directive, HostListener, Input, ComponentRef, ComponentFactoryResolver, ElementRef, ViewContainerRef, Renderer2, Injector } from '@angular/core';
import { TooltipContainerComponent } from '../tooltip-container/tooltip-container.component';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  @Input('tooltip') content: string;

  private componentRef: ComponentRef<TooltipContainerComponent>;

  @HostListener('mouseenter')
  mouseEnter(){
    if(this.componentRef) return ;
    const factory = this.resolver.resolveComponentFactory(TooltipContainerComponent);
    
    const injector = Injector.create([{
      provide: "tooltipConfig",
      useValue: {
        host: this.element.nativeElement
      }
    }])

    this.componentRef = this.vrc.createComponent(factory, 0, injector, [[this.renderer.createText(this.content)]])
    // create component inside tooltip container
    // this.renderer.appendChild(this.vrc.element.nativeElement,this.componentRef.location.nativeElement);
  }

  @HostListener('mouseout')
  mouseOut(){
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

  constructor(
    private element: ElementRef,
    private vrc: ViewContainerRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver
  ) { }

}
// 