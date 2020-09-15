import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientesFotonpmPage } from './clientes-fotonpm.page';

describe('ClientesFotonpmPage', () => {
  let component: ClientesFotonpmPage;
  let fixture: ComponentFixture<ClientesFotonpmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesFotonpmPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesFotonpmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
