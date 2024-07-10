import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Plan} from "../../interfaces/plans.interface";
import {PlansService} from "../../services/plans.service";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  plansList !: Plan[];
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'estado', 'acciones'];

  listPlan = [
    { value: 'id', valueView: 'ID' },
    { value: 'nombre', valueView: 'Nombre' },
    { value: 'precio', valueView: 'Precio' },
    { value: 'estado', valueView: 'Estado' }
  ]

  constructor(
    private plansService: PlansService,
    private router: Router
  ) {}

  ngOnInit() {
    this.plansService.getAllPlans()
      .subscribe({
        next: plans => {
          console.log(plans);
          this.plansList = plans;
        }
      })
  }

  addPlan() {
    this.router.navigate(['/planes/agregar']);
  }

  editPlan(plan: Plan) {
    this.router.navigate(['/planes/editar', plan.id]);
  }

  deletePlan(plan: Plan) {
    console.log('Borrar', plan)
    if ( plan?.id ) {
      this.plansService.removePlan(plan.id.toString())
        .subscribe({
          next: res => {
            console.log(`Plan ${plan.id} borrado!`)
          }
        })
    }

  }




}
