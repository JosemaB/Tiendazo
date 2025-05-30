import { Component, DestroyRef, inject, ElementRef } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { StringUtils } from '@shared/utils/string.utils';
import { Products } from '@store/interfaces/product.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteConfirmationComponent } from '@shared/components/modalDeleteConfirmation/modalDeleteConfirmation.component';
import { RouterModule } from '@angular/router';
import { CartsInterface } from '@store/interfaces/carts.interface';
import { CartsService } from '@store/services/carts.service';

@Component({
  selector: 'all-carts',
  imports: [RouterModule, MatPaginatorModule],
  templateUrl: './all-carts.component.html',
})
export class AllCartsComponent {

  cartsService = inject(CartsService);
  readonly dialog = inject(MatDialog);
  stringUtils = inject(StringUtils);
  destroyRef = inject(DestroyRef);

  carts: CartsInterface = {};
  searchValue = '';
  totalItems = 0;
  pageSize = 20;
  currentPage = 0;
  loading = false;

  ngOnInit(): void {
    this.cartsService.getAllCarts(1, 20).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (responses: CartsInterface) => {
        this.carts = responses;
        this.loading = true;
      },
      error: (err) => {
        this.loading = true;
        console.error('Error al cargar todos los carts:', err);
      }
    })

  }

  onPageChange(event: PageEvent) {
    this.cartsService.getAllCarts(event.pageIndex + 1, event.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: Products) => {
          this.carts = responses;
        },
        error: (err) => {
          console.error('Error al cargar todos los carts:', err);
        }
      })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onTyping(value: string) {
    this.cartsService.getSearchCart(value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: Products) => {
          this.carts = responses;
          console.log(value);
          console.log(responses);

          this.searchValue = value;
        },
        error: (err) => {
          console.error('Error al cargar todos los carts:', err);
        }
      })

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, itemName: string, element: HTMLElement): void {
    // si quieres, crea un ElementRef:
    const elementRef = new ElementRef(element);
    this.dialog.open(ModalDeleteConfirmationComponent, {
      data: { itemName, elementRef },
      width: '1000px',
      position: { top: '150px' },
      enterAnimationDuration,
      exitAnimationDuration,

    }
    );
  }
}
