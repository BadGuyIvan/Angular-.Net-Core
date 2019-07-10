import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-tooltip-container',
  templateUrl: './tooltip-container.component.html',
  styleUrls: ['./tooltip-container.component.css'],
  animations: [
    trigger('expand', [
      state('in', style({ opacity: '0' })),
      transition(':leave', [
        style({ opacity: '1' }),
        animate(500, style({ opacity: 0 }))
      ]), 
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: '1' }))
      ])
    ])
  ],
  host: { '[@expand]': 'in' }
})
export class TooltipContainerComponent implements OnInit {
  // private top: string
  private position: { "top": string; "left": string; };
  // private left: string;
  @ViewChild("container", { read: ElementRef, static: true }) private tooltipContainer

  constructor(@Inject('tooltipConfig') private config) { }

  ngOnInit() {
    //-----------------top position-----------------
    //postion where tooltip appear
    const { width, height } = this.tooltipContainer.nativeElement.getBoundingClientRect();
    //host of tooltip   
    const { top } = this.config.host.getBoundingClientRect();
    const _width = this.config.host.getBoundingClientRect().width;
    const middle_tooltip = _width/2
    const middle_container = width/2
    this.position = {
      "top":`${top-height}px`,
      "left": `${middle_container < middle_tooltip ? middle_tooltip - middle_container : middle_container- middle_tooltip }px`
    }
  }

}
