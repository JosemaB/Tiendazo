import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal-delete-confirmation',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modalDeleteConfirmation.component.html',
  styleUrl: './modalDeleteConfirmation.component.css',

})
export class ModalDeleteConfirmationComponent {
  toastr = inject(ToastrService);
  intervalId?: ReturnType<typeof setInterval>;

  itemName: string = 'este elemento';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data?.itemName) {
      this.itemName = data.itemName;
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  delete() {
    this.toastr.success(
      'Esto es solo una prueba, nada fue eliminado realmente',
      'Acción simulada'
    );

    this.data.elementRef.nativeElement.remove();
  }
}
