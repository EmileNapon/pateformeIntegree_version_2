import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPrincipaleComponent } from './navbar-principale.component';

describe('NavbarPrincipaleComponent', () => {
  let component: NavbarPrincipaleComponent;
  let fixture: ComponentFixture<NavbarPrincipaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarPrincipaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
