import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginNovoPage } from './login-novo.page';

describe('LoginNovoPage', () => {
  let component: LoginNovoPage;
  let fixture: ComponentFixture<LoginNovoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNovoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginNovoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
