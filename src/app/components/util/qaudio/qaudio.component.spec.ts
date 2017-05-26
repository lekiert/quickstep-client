import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QAudioComponent } from './qaudio.component';

describe('QAudioComponent', () => {
  let component: QAudioComponent;
  let fixture: ComponentFixture<QAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
