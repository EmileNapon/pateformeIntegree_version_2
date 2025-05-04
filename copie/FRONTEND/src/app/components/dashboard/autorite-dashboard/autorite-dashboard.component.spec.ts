import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoriteDashboardComponent } from './autorite-dashboard.component';

describe('AutoriteDashboardComponent', () => {
  let component: AutoriteDashboardComponent;
  let fixture: ComponentFixture<AutoriteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoriteDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoriteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
