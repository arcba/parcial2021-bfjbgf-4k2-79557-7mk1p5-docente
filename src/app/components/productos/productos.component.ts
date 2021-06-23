import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ModalDialogService } from '../../services/modal-dialog.service';
import { ProductosService } from '../../services/productos-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

      Lista: Producto[] = [];
      FormReg: FormGroup;
      mostrar: boolean = false;
      constructor(
        public formBuilder: FormBuilder,
        private productosService: ProductosService,
        private modalDialogService: ModalDialogService
      ) {}
      ngOnInit() {
        this.mostrarTabla();
        this.createForm();
      }
      mostrarTabla() {
        this.productosService.get().subscribe((res: any) => {
          this.Lista = res;
        });
      }
      Agregar() {
        this.mostrar = true;
      }
      createForm() {
        this.FormReg = this.formBuilder.group({
          ProductoID: [0],
          ProductoNombre: ['', [Validators.required]],
          ProductoFechaAlta: [
            null,
            [
              Validators.required,
              Validators.pattern(
                '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
              )
            ]
          ],
          ProductoStock: [0, [Validators.required]]
        });
      }
      Guardar() {
        if (this.FormReg.invalid) {
          return;
        }
        const formValue = this.FormReg.value;
        if (formValue.ProductoID == 0 || formValue.ProductoID == null) {
          formValue.ProductoID = 0;
          this.productosService.post(formValue).subscribe((res: any) => {
            this.Cancelar();
            this.modalDialogService.Alert('Registro agregado correctamente.');
            this.mostrarTabla();
          });
        }
      }
      Cancelar() {
        this.mostrar = false;
      }

  
  }
