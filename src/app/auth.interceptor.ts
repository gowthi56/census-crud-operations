import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserservService } from './userserv.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private serv: UserservService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.serv.getToken();
    const authUrls = ['https://dummyjson.com/auth/me'];
    const addUserUrl = 'https://dummyjson.com/users/add';

    // Check if the request URL requires authentication
    if (token && authUrls.some(url => request.url.includes(url))) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    // Check if the request URL is for adding a new user
    if (request.url === addUserUrl) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Check if the request URL contains '/users/'
    if (request.url.includes('/users/')) {
      // Extract the user ID from the URL
      const userId = this.extractUserId(request.url);
      // Modify the URL dynamically based on the user ID
      const dynamicUrl = `https://dummyjson.com/users/${userId}`;
      // Clone the request with the modified URL
      request = request.clone({ url: dynamicUrl });
    }

    return next.handle(request);
  }

  // Method to extract user ID from the URL
  private extractUserId(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }
}
