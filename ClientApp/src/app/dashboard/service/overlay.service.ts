import { Injectable } from '@angular/core';
import { PreviewComponent } from "../preview/preview.component";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  // // Inject overlay service
  constructor(private overlay: Overlay) { }

  open(){
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

  //   // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create(overlayConfig);
  //   // Create ComponentPortal that can be attached to a PortalHost
    const previewPortal = new ComponentPortal(PreviewComponent);
  //   // Attach ComponentPortal to PortalHost
    overlayRef.attach(previewPortal);
    overlayRef.backdropClick().subscribe(_ => overlayRef.dispose());
    
  }

}
