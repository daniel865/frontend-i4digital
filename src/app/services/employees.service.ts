import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError as observableThrowError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Employee } from "../model/employee";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private urlEndPoint: string = "http://localhost:8080/prueba/employees";
  constructor(private http: HttpClient, private router: Router) {}

  getEmployees(): Observable<any> {
    return this.http.get(this.urlEndPoint);
  }

  getEmployee(id: Number): Observable<any> {
    const url = `${this.urlEndPoint}/${id}`;
    return this.http.get(url);
  }

  updateEmployee(employee: Employee): Observable<any> {
    const url = `${this.urlEndPoint}/${employee.id}`;
    return this.http
      .put(url, employee, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  save(employee: Employee) {
    if (employee.id) {
      return this.put(employee);
    }
    return this.post(employee);
  }

  private post(employee: Employee) {
    return this.http
      .post(this.urlEndPoint, employee, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private put(employee: Employee) {
    const url = `${this.urlEndPoint}/${employee.id}`;
    console.log(url);
    return this.http.put(url, employee);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || "Server error");
  }
}
