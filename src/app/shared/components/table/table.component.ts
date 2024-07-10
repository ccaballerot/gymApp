import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
    `
    mat-card {
      margin: 2%;
    }

    button {
      margin: 0.18rem;
    }
    `
  ]
})
export class TableComponent implements OnInit, AfterViewInit {

  @Input() columns: any;
  @Input() data: any;
  @Input() dataSource: any;
  @Input() displayedColumns: string[] = [];

  @Output()
  passIdEvent = new EventEmitter<any>();

  @Output()
  deleteIdEvent = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(data: any) {
    this.passIdEvent.emit(data);
  }

  deleteItem(data: any) {
    this.deleteIdEvent.emit(data);
    // this.dataSource._updateChangeSubscription();
    this.dataSource.data = this.dataSource.data.filter((item: any, index: any) => item.id !== data.id );
  }

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

}
