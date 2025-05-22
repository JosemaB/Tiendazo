import { Component, computed, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ProductsCartComponent } from './components/ProductsCart/ProductsCart.component';
import { ShippingAddressComponent } from "./components/shipping-address/shipping-address.component";
import { NgxPaymentCardModule } from 'ngx-payment-card';
import { ProductsService } from '@store/services/products.service';
import { FormUtils } from '@shared/utils/form.utils';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { Product } from '@store/interfaces/product.interface';
import { CartProduct } from '@store/interfaces/productCart.interface';

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
      useValue: {
        showError: true,
        displayDefaultIndicatorType: false
      },

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
    NgxPaymentCardModule,
    ErrorFormComponent,
    RouterModule
  ],
})
export class ShoppingCartComponentComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  formBuilder = inject(FormBuilder);
  productsService = inject(ProductsService);
  formUtils = FormUtils;
  isLoading = false;
  isCompleted = false;

  addressFormBuilder = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(FormUtils.textPattern)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(FormUtils.textPattern)]],
    pais: ['', Validators.required],
    movil: ['', [Validators.required, Validators.pattern(FormUtils.phoneNumberPattern)]],
    direccion: ['', [Validators.required, Validators.minLength(2), Validators.pattern(FormUtils.addressPattern)]],
    datosAdicionales: [''],
    observaciones: [''],
    codigoPostal: ['', [Validators.required, Validators.pattern(FormUtils.postalCodePattern)]],
    poblacion: ['', [Validators.required, Validators.minLength(2), Validators.pattern(FormUtils.locationPattern)]],
    provincia: ['', [Validators.required, Validators.minLength(2), Validators.pattern(FormUtils.locationPattern)]]
  });

  cardForm = this.formBuilder.group({
    cardHolderName: ['', [Validators.required, Validators.minLength(5), Validators.pattern(FormUtils.textPattern), Validators.maxLength(18)]],
    IBAN: ['', [Validators.required, Validators.pattern(FormUtils.ibanPattern), Validators.maxLength(15)]],
    cardNumber: ['', [Validators.required, Validators.pattern(FormUtils.cardNumberPattern), Validators.maxLength(20)]],
    cardCvv: ['', [Validators.pattern(FormUtils.cardCvvPattern)]]
  });


  totalUnits = computed(() =>
    this.productsService.productsCart().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.productsService.productsCart().reduce((acc, item) => acc + item.price! * item.quantity, 0).toFixed(2)
  );

  onStepChange(event: StepperSelectionEvent): void {
    const previousStep = event.previouslySelectedIndex;

    // El paso de dirección es el índice 1
    if (previousStep === 1 && !this.addressFormBuilder.valid) {
      this.addressFormBuilder.markAllAsTouched();

    } else if (previousStep === 2 && !this.addressFormBuilder.valid) {
      this.addressFormBuilder.markAllAsTouched();
    }
  }

  procesarCompra() {
    this.isLoading = true;

    // Simulamos un proceso de compra
    setTimeout(() => {
      this.isLoading = false;
      this.isCompleted = true;
      localStorage.removeItem('cart');

      const productsPurchaseHistory: CartProduct[] = [];
      this.productsService.productsCart().forEach((product) => {
        productsPurchaseHistory.push(product);
      });
      this.productsService.saveProductToPurchaseHistory(productsPurchaseHistory)
      this.productsService.productsCart.set([]);
    }, 3000);
  }

}


