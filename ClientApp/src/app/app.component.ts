import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';;
import { LoaderService } from './services/loader.service';
import { Observable } from 'rxjs';
import { NavigationEnd, NavigationCancel, Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  
  constructor(private loaderService: LoaderService, private router: Router) { }

  ngAfterViewInit(): void {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd || event instanceof NavigationCancel ) {
          this.loaderService.isLoading.next(false);
        }
      })
  }

}
