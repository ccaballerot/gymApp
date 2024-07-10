import { inject } from "@angular/core"
import { Router } from "@angular/router"


export const authGuard = () => {
  const router = inject(Router)

  if ( !localStorage.getItem('token') ) {
    console.log('No tiene permisos');
    router.navigate(['/login']);
    return false;
  }
  console.log('Tiene permisos');
  return true;
}
