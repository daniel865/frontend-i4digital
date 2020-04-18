import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { EmployeesService } from "src/app/services/employees.service";
import { Employee } from "src/app/model/employee";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  private idEmployee: Number;
  public employee: Employee;
  public employeeDetailForm;
  public loading = false;
  private error: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public employeeService: EmployeesService
  ) {
    this.employeeDetailForm = this.formBuilder.group({
      id: [""],
      name: [""],
      surname: [""],
      occupation: [""],
      phone: [""],
      id_user: [""],
      username: [""],
      email: [""],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params) => (this.idEmployee = +params.get("id"))
    );

    this.loading = true;
    this.employeeService.getEmployee(this.idEmployee).subscribe((data) => {
      console.log("data");
      console.log(data);
      this.employee = data;
      this.loading = false;
      this.initForm(this.employee);
    });
  }

  initForm(employee: Employee) {
    this.employeeDetailForm.setValue({
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      occupation: employee.occupation,
      phone: employee.phone,
      id_user: employee.user.id,
      username: employee.user.username,
      email: employee.user.email,
    });
  }

  save() {
    const updatedEmployee = this.employeeDetailForm.getRawValue();
    this.employeeService
      .save({
        id: updatedEmployee.id,
        name: updatedEmployee.name,
        surname: updatedEmployee.surname,
        occupation: updatedEmployee.occupation,
        phone: updatedEmployee.phone,
        user: {
          id: updatedEmployee.id_user,
          username: updatedEmployee.username,
          email: updatedEmployee.email,
        },
      })
      .subscribe(
        (employee) => {
          this.goBack();
        },
        (error) => (this.error = error)
      );
  }

  goBack() {
    window.history.back();
  }
}
