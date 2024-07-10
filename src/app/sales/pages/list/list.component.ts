import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sales } from '../../interfaces/sales.interface';
import { SalesService } from '../../services/sales.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent {

  salesList !: Sales[];
  dataSource:any;
  displayedColumns: string[] = ['fecha', 'cliente', 'comprobante', 'total', 'estado', 'acciones'];
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  listSales = [
    { value: 'fecha', valueView: 'Fecha' },
    { value: 'cliente', valueView: 'Cliente' },
    { value: 'comprobante', valueView: 'Comprobante' },
    { value: 'total', valueView: 'Total' },
    { value: 'estado', valueView: 'Estado' }
  ]

  constructor(
    private salesService: SalesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.salesService.getAllSales()
      .subscribe({
        next: sales => {
          console.log(sales);
          this.salesList = sales;
          this.dataSource = new MatTableDataSource<Sales>(this.salesList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
  }

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  addSale() {
    this.router.navigate(['/ventas/agregar']);
  }

}
