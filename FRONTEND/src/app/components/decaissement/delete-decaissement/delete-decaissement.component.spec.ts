import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDecaissementComponent } from './delete-decaissement.component';

describe('DeleteDecaissementComponent', () => {
  let component: DeleteDecaissementComponent;
  let fixture: ComponentFixture<DeleteDecaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDecaissementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDecaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
