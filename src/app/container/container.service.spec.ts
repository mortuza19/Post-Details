import { TestBed } from '@angular/core/testing';
import {ContainerService} from './container.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {

    let ApiService: ContainerService;
    let httpTestingController: HttpTestingController;
    const mockData = [
        {
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false
        },
        {
          userId: 1,
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false
        },
        {
          userId: 1,
          id: 3,
          title: 'fugiat veniam minus',
          completed: false
        },
        {
          userId: 1,
          id: 4,
          title: 'et porro tempora',
          completed: true
        },
        {
          userId: 1,
          id: 5,
          title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
          completed: false
    }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ContainerService]
        });
        ApiService = TestBed.inject(ContainerService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should exist', () => {
        expect(ApiService).toBeDefined();
    });

    it('it should retrieve all value', (done) => {
        ApiService.getPost().subscribe((res: any) => {
            expect(res).toBeTruthy();
            const user = res.find((item: any) => item.id === 4);
            expect(user.title).toBe('et porro tempora');
            done();
        });
        const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
        expect(req.request.method).toEqual('GET');
        req.flush(mockData);
    });


    it('should save the user', (done) => {

      const change = {
        id: 11,
        userId: 2,
        title: 'Angular PUT Request Example',
        body: 'Test body'
      };
      ApiService.savePost(change).subscribe((data: any) => {
          expect(data).toBeTruthy();
          expect(data.id).toBe(11);
          done();
      });
      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body.title).toEqual(change.title);
      req.flush({...mockData, ...change});

    });

    it('should give an error if save course fails', () => {
      const change = { title: 'Angular PUT Request Example' };

      ApiService.savePost(change).subscribe(() => fail('Save user api failed'), // to fail the saveCourse
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
        }); // error block gets executed once fapi failed
      const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toEqual('POST');
      req.flush('Save course failed', {status: 500, statusText: 'Internal server error'});
    });

    afterEach(() => {
      httpTestingController.verify();
  });

});
