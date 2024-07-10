import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteE } from '../../interfaces/clients.interface';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: []
})
export class ListarComponent implements OnInit {

  clientesList !: Cliente[];
  displayedColumns: string[] = ['id', 'fullName', 'celular', 'email', 'estado', 'acciones'];

  listCliente = [
    { value: 'id', valueView: 'ID' },
    { value: 'fullName', valueView: 'Nombres' },
    { value: 'celular', valueView: 'Celular' },
    { value: 'email', valueView: 'Correo' },
    { value: 'estado', valueView: 'Estado' }
  ]

  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientesService.clientesList().subscribe({
      next: res => {
        this.clientesList = res;
      }
    })
  }

  addClient() {
    this.router.navigate(['/clientes/agregar']);
  }

  editClient(cliente: ClienteE) {
    this.router.navigate(['/clientes/editar', cliente.id]);
  }

  deleteClient(cliente: ClienteE) {
    console.log('Borrar', cliente)

    this.clientesService.removeClient(cliente.id.toString())
      .subscribe({
        next: res => {
          console.log(`Cliente ${cliente.id} borrado!`)
        }
      })
  }

}
