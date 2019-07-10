import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "./interceptor/http-config-interceptor";
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from "@angular/cdk/overlay";
import { PreviewComponent } from './preview/preview.component';
import { OverlayService } from './service/overlay.service';
import { TooltipComponent } from './tooltip/tooltip.component';
import { DunamictooltipComponent } from './tooltip/dunamictooltip/dunamictooltip.component';
import { TooltipContainerComponent } from './tooltip/tooltip-container/tooltip-container.component';
import { TooltipDirective } from './tooltip/directive/tooltip.directive';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "tooltip", component: TooltipComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    ModalComponent, 
    PreviewComponent, 
    TooltipComponent, 
    DunamictooltipComponent, 
    TooltipContainerComponent, 
    TooltipDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    OverlayService
  ],
  entryComponents: [ModalComponent, PreviewComponent, TooltipContainerComponent]
})
export class DashboardModule { }
