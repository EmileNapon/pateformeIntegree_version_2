import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePartenairesComponent } from './create-partenaires.component';


describe('PartenairesComponent', () => {
  let component: CreatePartenairesComponent;
  let fixture: ComponentFixture<CreatePartenairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePartenairesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
