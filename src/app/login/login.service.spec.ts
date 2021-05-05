import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { LoginService, User } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let req;
  const mockUserList: User[] = [
    {
      user_id: 'sahil19',
      pwd: '1234567',
      user_name: 'Sahil Mortuza'
    }, {
      user_id: 'trina09',
      pwd: '1234567',
      user_name: 'Trina Chatterjee'
    }, {
      user_id: 'vilku69',
      pwd: '1234567',
      user_name: 'S. Vilku'
    }, {
      user_id: 'velka96',
      pwd: '1234567',
      user_name: 'T. Velka'
    }, {
      user_id: 'admin',
      pwd: '1234567',
      user_name: 'Admin'
    }
  ];
  const user: User = {
    user_id: 'sahil19',
    pwd: '1234567',
    user_name: 'Sahil'
  };

  const wrongUser: User = {
    user_id: 'sahil197',
    pwd: '123456799',
    user_name: 'Sahil'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the user if found', (done) => {
    service.login(user).subscribe((User: User) => {
      expect(User.user_name).toBe('Sahil Mortuza');
      done();
    });
    req = httpTestingController.expectOne('../../assets/user.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserList);
  });

  it('should return null if not found', (done) => {
    service.login(wrongUser).subscribe((User: User) => {
      expect(User).toBeFalsy();
      done();
    });
    req = httpTestingController.expectOne('../../assets/user.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserList);
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
