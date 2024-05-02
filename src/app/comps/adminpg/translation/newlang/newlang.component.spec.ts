import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlangComponent } from './newlang.component';

describe('NewlangComponent', () => {
  let component: NewlangComponent;
  let fixture: ComponentFixture<NewlangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewlangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewlangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
