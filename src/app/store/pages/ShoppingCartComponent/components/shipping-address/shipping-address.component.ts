import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { FormUtils } from '@shared/utils/form.utils';

@Component({
  selector: 'shipping-address',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, ErrorFormComponent, MatInputModule],
  templateUrl: './shipping-address.component.html',
})
export class ShippingAddressComponent {
  @Input() addressFormBuilder!: FormGroup;
  formUtils = FormUtils;

}
