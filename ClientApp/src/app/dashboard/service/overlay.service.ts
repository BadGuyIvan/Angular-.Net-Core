import { Injectable, InjectionToken, Injector, ComponentRef } from '@angular/core';
import { PreviewComponent } from "../preview/preview.component";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

export const PORTAL_DATA = new InjectionToken<{}>('PortalData');

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  // Inject overlay service
  constructor(private overlay: Overlay, private injector: Injector) { }

  prew: Subject<any> = new Subject();

  open(data) {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      panelClass: 'tm-file-preview-dialog-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    })

    const injectorTokens = new WeakMap();
    injectorTokens.set(PORTAL_DATA, data);

    const _injector: PortalInjector = new PortalInjector(this.injector, injectorTokens)

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create(overlayConfig);
    // Create ComponentPortal that can be attached to a PortalHost
    const previewPortal = new ComponentPortal(PreviewComponent, null, _injector);
    // Attach ComponentPortal to PortalHost
    const containerRef: ComponentRef<PreviewComponent> = overlayRef.attach(previewPortal);
    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
    containerRef.onDestroy(() => {
      this.prew.next(containerRef.instance.name);
    })
  }

}
