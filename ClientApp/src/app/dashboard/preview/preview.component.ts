import { Component, OnInit, Injector } from '@angular/core';
import { PORTAL_DATA } from '../service/overlay.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  private config;
  name: String;

  constructor(private injector: Injector) {
    this.config = injector.get(PORTAL_DATA);
  }
  
  ngOnInit() {
    this.name = this.config.name;
  }

}
