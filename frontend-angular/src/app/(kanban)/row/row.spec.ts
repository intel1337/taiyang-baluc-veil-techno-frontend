import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Row } from './row';

describe('Row', () => {
  let component: Row;
  let fixture: ComponentFixture<Row>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Row]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Row);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
