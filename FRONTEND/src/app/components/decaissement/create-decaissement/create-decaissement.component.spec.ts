import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDecaissementComponent } from './create-decaissement.component';

describe('CreateDecaissementComponent', () => {
  let component: CreateDecaissementComponent;
  let fixture: ComponentFixture<CreateDecaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDecaissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDecaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
