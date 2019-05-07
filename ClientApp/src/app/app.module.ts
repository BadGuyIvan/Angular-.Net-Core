import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthGuardService as AuthGuard } from "./guards/auth-guard.service"
import { TokenGuardService as IsTokenExist } from "./guards/token-quard.service";
import { NotFountComponent } from './not-fount/not-fount.component';
import { LoaderInterceptor } from "./services/loader.interceptor"
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFountComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', loadChildren: "./auth/auth.module#AuthModule",
        canActivate: [IsTokenExist]
      },{
        path: 'dashboard', 
        loadChildren: "./dashboard/dashboard.module#DashboardModule",
        canActivate: [AuthGuard]
      }, {
        path: '**', component: NotFountComponent
      }
    ])
  ],
  providers: [ 
    LoaderService,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
