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

const routes: Routes = [
  {
    path: "", component: HomeComponent
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
  declarations: [HomeComponent,ModalComponent, PreviewComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    OverlayService
  ],
  entryComponents: [ModalComponent, PreviewComponent]
})
export class DashboardModule { }
