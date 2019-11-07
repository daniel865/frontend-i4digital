import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private urlEndPoint: string = 'http://localhost:8080/prueba/employees';
  constructor(private http: HttpClient, private router: Router) { }

  getEmployees(): Observable<any>{
    return this.http.get(this.urlEndPoint);
  }
}
