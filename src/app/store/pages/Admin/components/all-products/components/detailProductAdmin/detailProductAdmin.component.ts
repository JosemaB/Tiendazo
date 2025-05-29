import { Component, inject } from '@angular/core';
import { Product } from '@store/interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@store/services/products.service';
import { StringUtils } from '@shared/utils/string.utils';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorFormComponent } from '@shared/components/errorForm/errorForm.component';
import { ToastrService } from 'ngx-toastr';
import { FormUtils } from '@shared/utils/form.utils';

@Component({
  selector: 'app-detail-product-admin',
  imports: [CommonModule, ReactiveFormsModule, ErrorFormComponent],
  templateUrl: './detailProductAdmin.component.html',
})
export class DetailProductAdminComponent {

  productsService = inject(ProductsService);
  utilsString = inject(StringUtils);
  toastr = inject(ToastrService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  product: Product = {};
  myForm!: FormGroup;
  productNotFound = false;
  isSaving = false;
  categories: string[] = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
  ];

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    this.productsService.getSearchProductID(userId!).subscribe({
      next: (response: Product) => {
        this.product = response;
        this.initForm();
      },
      error: (err) => {
        this.productNotFound = true;
        console.error('Error al cargar el usuario:', err);
      }
    })
  }

  initForm() {
    this.myForm = this.fb.group({
      title: [this.product.title, [Validators.required, Validators.pattern(this.formUtils.textPattern)]],
      brand: [this.product.brand, [Validators.required, Validators.pattern(this.formUtils.textPattern)]],
      price: [this.product.price, [Validators.required]],
      category: [this.product.category, [Validators.required]]
    });
  }

  get orderedCategories(): string[] {
    if (!this.product.category) return this.categories;

    return [
      this.product.category,
      ...this.categories.filter(cat => cat !== this.product.category),
    ];
  }

  saveProduct() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    this.toastr.success('Actualización completada. *Este cambio es solo una simulación*', 'Producto actualizado', {
      positionClass: 'toast-bottom-right',
    });
    this.isSaving = true;
  }

}
