import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesManegmentComponent } from './courses-manegment.component';

describe('CoursesManegmentComponent', () => {
  let component: CoursesManegmentComponent;
  let fixture: ComponentFixture<CoursesManegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesManegmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursesManegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
