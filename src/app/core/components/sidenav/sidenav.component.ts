import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [`
    .container {
      margin: 10px;
    }

    mat-toolbar {
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class SidenavComponent {

  public sidebarItems = [
    { label: 'Clientes', icon: 'person', url: '/clientes/listar' },
    { label: 'Planes', icon: 'vertical_split', url: '/planes/listar' },
    { label: 'Servicios', icon: 'storage', url: '/servicios/listar' },
    { label: 'Productos', icon: 'shoping_bag', url: '/productos/listar' },
    { label: 'Ventas', icon: 'sell', url: '/ventas/listar' },
  ]

}
