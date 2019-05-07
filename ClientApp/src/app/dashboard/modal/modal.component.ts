import { Component, OnInit, Input, Injector, Inject, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('someProp') someProp;
  @Output() closeWindow = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  
  name: String = this.config.name || 'Prosto';

  constructor(@Inject('config') private config) { }

  close() {
    this.closeWindow.emit();
    this.valueChange.emit(this.name)
  }

  ngOnInit() {
    console.log("123",this.config);
    this.someProp = this.config.name;
  }

}
