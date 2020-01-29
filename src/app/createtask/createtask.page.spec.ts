import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatetaskPage } from './createtask.page';

describe('CreatetaskPage', () => {
  let component: CreatetaskPage;
  let fixture: ComponentFixture<CreatetaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatetaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
