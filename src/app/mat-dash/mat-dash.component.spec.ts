
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDashComponent } from './mat-dash.component';

describe('MatDashComponent', () => {
  let component: MatDashComponent;
  let fixture: ComponentFixture<MatDashComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
