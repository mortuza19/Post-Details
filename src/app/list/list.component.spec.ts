import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });
  }));

  test('should verify the component to be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display a card', () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: 'Test Title',
      body: 'Test Body'
    };
    component.postData = mockData;
    fixture.detectChanges();
    const card = el.queryAll(By.css('.card'));
    const cardTitle = el.query(By.css('.card-title'));
    const cardContent = el.query(By.css('.card-text'));
    expect(card.length).toBe(1);
    expect(cardTitle.nativeElement.textContent).toBe(mockData.title);
    expect(cardContent.nativeElement.textContent).toBe(mockData.body);
  });
});
