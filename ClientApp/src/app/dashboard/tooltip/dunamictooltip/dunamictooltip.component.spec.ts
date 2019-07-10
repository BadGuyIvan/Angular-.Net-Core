import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DunamictooltipComponent } from './dunamictooltip.component';

describe('DunamictooltipComponent', () => {
  let component: DunamictooltipComponent;
  let fixture: ComponentFixture<DunamictooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DunamictooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DunamictooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
