import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { ApplicationRef, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of, scheduled } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ContainerComponent } from './container.component';
import { AppModule } from '../app.module';
import { ContainerService } from './container.service';

export class MockNgbModalRef {
  closed: Observable<any> = of(newUser);
}

const newUser = {
  userId: 2,
  id: 11,
  title: 'New data',
  body: 'New body'
};

describe('App Component', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let el: DebugElement;
  let containerService: any;
  let modalService: NgbModal;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let applicationRef: ApplicationRef;

  const mockData = [
    {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
      userId: 1,
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut'
    },
    {
      userId: 1,
      id: 4,
      title: 'eum et est occaecati',
      body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit'
    },
    {
      userId: 1,
      id: 5,
      title: 'nesciunt quas odio',
      body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque'
    },
    {
      userId: 1,
      id: 6,
      title: 'dolorem eum magni eos aperiam quia',
      body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae'
    },
    {
      userId: 1,
      id: 7,
      title: 'magnam facilis autem',
      body: 'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas'
    },
    {
      userId: 1,
      id: 8,
      title: 'dolorem dolore est ipsam',
      body: 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae'
    },
    {
      userId: 1,
      id: 9,
      title: 'nesciunt iure omnis dolorem tempora et accusantium',
      body: 'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas'
    },
    {
      userId: 1,
      id: 10,
      title: 'optio molestias id quia eum',
      body: 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error'
    },
  ];

  const appMockService = {
    getPost: jest.fn()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [{
        provide: ContainerService,
        useValue: appMockService
      },
      {
        provide: APP_BASE_HREF,
        useValue: '/'
      }],
      imports: [AppModule, NoopAnimationsModule],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ContainerComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      modalService = TestBed.inject(NgbModal);
      containerService = TestBed.inject(ContainerService);
      applicationRef = TestBed.inject(ApplicationRef);
    });
  }));


  test('should verify the component to be created', () => {
    expect(component).toBeTruthy();
  });

  test('should verify the title', () => {
    const title = 'New Jest Heading';
    component.title = title;
    containerService.getPost.mockReturnValue(of(mockData));
    fixture.detectChanges();
    const navBarHeading = el.query(By.css('.navbar-brand'));
    expect(navBarHeading.nativeElement.textContent).toBe(title);
  });

  test('should verify the post observable', fakeAsync(() => {
    containerService.getPost.mockReturnValue(of(mockData));
    fixture.detectChanges();
    expect(component.posts$).toBeTruthy();
    component.posts$.subscribe((posts) => {
      expect(posts.length).toBe(10);
      expect(posts.length).not.toBe(9);
    });
    flush();
  }));

  test('should verify the post cards in UI', () => {
    containerService.getPost.mockReturnValue(of(mockData));
    fixture.detectChanges();
    const cardList = el.queryAll(By.css('.card'));
    expect(cardList).toBeTruthy();
    expect(cardList.length).toBe(10);
  });

  it('should open modal', fakeAsync(() => {
    containerService.getPost.mockReturnValue(of(mockData));
    fixture.detectChanges();
    spyOn(modalService, 'open').and.returnValue(mockModalRef);
    component.open();
    flush();
    expect(modalService.open).toHaveBeenCalled();
  }));

  // it('should update the postData', fakeAsync(() => {
  //   containerService.getPost.mockReturnValue(of(mockData));
  //   fixture.detectChanges();
  //   spyOn(modalService, 'open').and.returnValue(mockModalRef);
  //   component.open();
  //   component.postData$.subscribe(posts => {
  //     expect(posts.length).toBe(11);
  //     tick(1000);
  //   });
  // }));

  // it('should open the modal when add post link is clicked', fakeAsync(() => {
  //   containerService.getPost.mockReturnValue(of(mockData));
  //   const link = el.query(By.css('.btn-link'));
  //   expect(link.nativeElement.textContent).toBe('Add Post');
  //   link.nativeElement.click();
  //   fixture.detectChanges();
  //   tick();
  //   // applicationRef.tick();
  //   const modal = el.query(By.css('nav'));
  //   // expect(modal[0].nativeElement).toBeTruthy();
  // }));

});
