import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormUtils } from '@shared/utils/form.utils';
import { ProductsService } from '@store/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'modal-comment-product',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './modalCommentProduct.component.html',
  styleUrl: './modalCommentProduct.component.css',
})
export class ModalCommentProductComponent {
  toastr = inject(ToastrService);
  productsService = inject(ProductsService);
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  initialReview: string = '';
  productoId: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalCommentProductComponent>
  ) {
    this.productoId = data.producto;
  }


  ngOnInit() {
    this.initialReview = this.productsService.getReviewProduct(this.productoId)["review"] || '';
    this.myForm.patchValue({ reviewTextarea: this.initialReview });

  }
  myForm = this.fb.group({
    reviewTextarea: ['', [Validators.required, Validators.pattern(/\S+/)]],
  });

  send() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    const { reviewTextarea } = this.myForm.value
    this.toastr.success('Tu reseña ha sido enviada correctamente. ¡Gracias por compartir tu experiencia!',
      'Reseña enviada', {
      positionClass: 'toast-bottom-right',
    });
    this.productsService.saveReview(this.productoId, reviewTextarea?.trim()!);
    this.dialogRef.close(true); // ← Cierra el diálogo manualmente solo si todo fue bien
  }
}
