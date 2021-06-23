 
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
 
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
 
import { ProductosComponent } from "./productos.component";
 
const routes: Routes = [{ path: "", component: ProductosComponent }];
 
@NgModule({
  declarations: [ProductosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgbModule
  ]
})
export class ProductosModule {}