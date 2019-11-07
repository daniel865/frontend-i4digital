import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  public employees:Employee[];
  public loading = false;
  constructor(private router:Router, public employeeService:EmployeesService) { }

  ngOnInit() {
    this.loading = true;
    this.employeeService.getEmployees()
    .subscribe(data=>{
        this.employees = data;
        this.loading = false;
    });
    
  }

}
