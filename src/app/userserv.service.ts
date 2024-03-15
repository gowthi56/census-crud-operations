import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './datas.interface';

@Injectable({
  providedIn: 'root'
})
export class UserservService {

  private apiUrl = 'https://dummyjson.com/users';
  private loggedIn: boolean = false;
  private token: string | null = null;
  

  constructor(private http: HttpClient) { }
  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}?limit=99`);
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('https://dummyjson.com/auth/login', { username, password });
  }

  logout(): void {
    // Perform logout tasks here
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  setToken(token: string): void {
    this.token = token;
    console.log(this.token);
  }
  getToken()
  {
    return this.token
  }
  fetchUserProfile(): Observable<any> {
    // const headers = this.getHeadersWithToken();
    return this.http.get<any>('https://dummyjson.com/auth/me');
  }
  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }
  getUsersByHairColor(color: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter?key=hair.type&value=${color}`);
  }
  getUserCart(userid:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userid}/carts`)
  }
  getuserpost(userid:number):Observable<any>
  {
    return this.http.get(`${this.apiUrl}/${userid}/todos`)

  }
  addUser(firstName: string, lastName: string, age: number): Observable<any> {
    const url = `${this.apiUrl}/add`;
    const body = {
      firstName,
      lastName,
      age,
      /* other user data */
    };
    return this.http.post<any>(url, body);
  }
  updateUser(userId: number, firstName: string, lastName: string, age: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const body = {
      firstName,
      lastName,
      age,
      /* other user data */
    };
    return this.http.patch<any>(url, body);
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }
  
}
