import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDecaissementComponent } from './list-decaissement.component';

describe('ListDecaissementComponent', () => {
  let component: ListDecaissementComponent;
  let fixture: ComponentFixture<ListDecaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDecaissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDecaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
