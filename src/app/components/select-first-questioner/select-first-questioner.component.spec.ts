import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFirstQuestionerComponent } from './select-first-questioner.component';

describe('SelectFirstQuestionerComponent', () => {
  let component: SelectFirstQuestionerComponent;
  let fixture: ComponentFixture<SelectFirstQuestionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFirstQuestionerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFirstQuestionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
