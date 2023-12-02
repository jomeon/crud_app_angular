import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpgnAddEditComponent } from './cmpgn-add-edit.component';

describe('CmpgnAddEditComponent', () => {
  let component: CmpgnAddEditComponent;
  let fixture: ComponentFixture<CmpgnAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmpgnAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmpgnAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
