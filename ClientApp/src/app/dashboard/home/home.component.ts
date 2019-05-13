import {
  Component, OnInit,
  ViewChild, ViewContainerRef,
  ComponentFactoryResolver, ComponentRef, ComponentFactory, ReflectiveInjector, Injector, Provider, ViewEncapsulation, Inject, ContentChildren, AfterContentInit, AfterViewInit, SimpleChange
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from "../modal/modal.component";
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OverlayService } from "../service/overlay.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild("alertContainer", { read: ViewContainerRef }) entry: ViewContainerRef;
  @ContentChildren(ModalComponent) children: ModalComponent;

  componentRef: ComponentRef<any>;
  results: Array<string> = []
  injector: Injector;
  configProvider: Provider
  name: string = "Onil";

  constructor(private http: HttpClient, private resolver: ComponentFactoryResolver, private previewDialog: OverlayService) {
  }
  onClick() {
    this.http.get("https://localhost:5001/api/dashboard")
      .subscribe(
        result => console.log(result)
      )
  }

  createComponent() {
    this.entry.clear();
    let inputProviders = {
      provide: "config", useValue:
      {
        name: this.name,
        age: 35
      }
    }
    this.injector = ReflectiveInjector.resolveAndCreate([inputProviders])
    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    this.componentRef = this.entry.createComponent(factory, 0, this.injector);
    let change: Subscription = this.componentRef.instance.valueChange.subscribe((value: any) => { this.name = value; });
    this.componentRef.instance.closeWindow.subscribe(() => this.componentRef.destroy())
    this.componentRef.onDestroy(() => {
      console.log("destroy")
    })
  }

  showPreview(){
   this.previewDialog.open({name: this.name})
  }

  ngOnInit() {
    this.previewDialog.prew.subscribe(prev => this.name = prev);
  }

}
