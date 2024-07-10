import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioList } from '../../interfaces/servicio.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServicioService } from '../../services/servicio.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  servicioList !: ServicioList[];
  dataSource:any;
  displayedColumns: string[] = ['id', 'plan', 'cliente', 'periodo', 'diasRest', 'estado', 'acciones'];
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  listServicio = [
    {
      value: 'id',
      valueView: 'ID'
    },
    {
      value: 'plan',
      valueView: 'Plan'
    },
    {
      value: 'cliente',
      valueView: 'Cliente'
    },
    {
      value: 'periodo',
      valueView: 'Periodo'
    },
    {
      value: 'diasRest',
      valueView: 'Dias Restantes'
    },
    {
      value: 'estado',
      valueView: 'Estado'
    },

  ];
  columns: any = [];

  constructor(
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.servicioService.getAllServicios()
      .subscribe({
        next: servicios => {
          this.servicioList = servicios;
          this.columns = this.servicioList;
          this.dataSource = new MatTableDataSource<ServicioList>(this.servicioList);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
  }

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  addServicio() {
    this.router.navigate(['/servicios/agregar']);
  }


}
