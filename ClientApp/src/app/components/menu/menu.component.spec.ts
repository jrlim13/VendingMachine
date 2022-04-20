import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { MenuComponent } from './menu.component';
import { CanService } from '../../can.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let canServiceSpy: jasmine.SpyObj<CanService>
  let cansMock = [
    { "id": 1, "name": "Coca-cola Classic 375ml", "price": 2.89, "stock": 5, "imgName": "cocaColaClassic.jpg" },
    { "id": 2, "name": "Coca-cola No Sugar 375ml", "price": 2.89, "stock": 3, "imgName": "cocaColaNoSugar.jpg" },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost' },
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    const canServiceSpy= jasmine.createSpyObj('CanService', ['getAll']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CanService, useValue: canServiceSpy }],
    }).compileComponents();
  });


  beforeEach(() => {
    canServiceSpy = TestBed.inject(CanService) as jasmine.SpyObj<CanService>;
    canServiceSpy.getAll.and.returnValue(of(cansMock));
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays can name', () => {
    const compiled = fixture.debugElement.query(By.css('#can-1-name'))
    expect(compiled.nativeElement.textContent).toContain("Coca-cola Classic 375ml");
  });

  it('displays can name', () => {
    const compiled = fixture.debugElement.query(By.css('#can-1-name'))
    expect(compiled.nativeElement.textContent).toContain("Coca-cola Classic 375ml");
  });
});
