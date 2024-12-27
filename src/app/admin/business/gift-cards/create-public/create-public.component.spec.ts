import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicComponent } from './create-public.component';

describe('CreatePublicComponent', () => {
  let component: CreatePublicComponent;
  let fixture: ComponentFixture<CreatePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
