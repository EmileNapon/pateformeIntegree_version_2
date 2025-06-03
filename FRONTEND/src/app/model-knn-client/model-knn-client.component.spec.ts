import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelKNNClientComponent } from './model-knn-client.component';

describe('ModelKNNClientComponent', () => {
  let component: ModelKNNClientComponent;
  let fixture: ComponentFixture<ModelKNNClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelKNNClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelKNNClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
