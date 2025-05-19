import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { ProductsCartComponent } from './components/ProductsCart/ProductsCart.component';
import { ShippingAddressComponent } from "./components/shipping-address/shipping-address.component";
import { NgxPaymentCardModule } from 'ngx-payment-card';

/**
 * @title Stepper with customized states
 */
@Component({
  selector: 'stepper-states-example',
  templateUrl: 'ShoppingCartComponent.component.html',
  styleUrl: 'ShoppingCartComponent.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ProductsCartComponent,
    ShippingAddressComponent,
    NgxPaymentCardModule
  ],
})
export class ShoppingCartComponentComponent {
  private formBuilder = inject(FormBuilder);
  currentDate: Date = new Date();

  addressFormBuilder = this.formBuilder.group({
    nombre: [''],
    apellidos: [''],
    pais: [''],
    movil: [''],
    direccion: [''],
    datosAdicionales: [''],
    observaciones: [''],
    codigoPostal: [''],
    poblacion: [''],
    provincia: ['']
  });

  cardForm = this.formBuilder.group({
    cardHolderName: [''],
    IBAN: [''],
    cardNumber: [''],
    cardCvv: ['']
  });

}
