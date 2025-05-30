import { Component, DestroyRef, Inject, inject, OnInit, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { StringUtils } from '@shared/utils/string.utils';
import { Products } from '@store/interfaces/product.interface';
import { ProductsService } from '@store/services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteConfirmationComponent } from '@shared/components/modalDeleteConfirmation/modalDeleteConfirmation.component';


@Component({
  selector: 'all-products',
  imports: [RouterModule, MatPaginatorModule],
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  productsService = inject(ProductsService);
  readonly dialog = inject(MatDialog);
  stringUtils = inject(StringUtils);
  destroyRef = inject(DestroyRef);
  products: Products = {};
  searchValue = '';
  totalItems = 0;
  pageSize = 20;
  currentPage = 0;
  loading = false;

  ngOnInit(): void {
    this.productsService.getAllProducts(1, 20).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (responses: Products) => {
        this.products = responses;
        this.loading = true;
      },
      error: (err) => {
        this.loading = true;
        console.error('Error al cargar todos los productos:', err);
      }
    })

  }

  onPageChange(event: PageEvent) {
    this.productsService.getAllProducts(event.pageIndex + 1, event.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: Products) => {
          this.products = responses;
        },
        error: (err) => {
          console.error('Error al cargar todos los productos:', err);
        }
      })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onTyping(value: string) {
    this.productsService.getSearchProduct(value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: Products) => {
          this.products = responses;
          this.searchValue = value;
        },
        error: (err) => {
          console.error('Error al cargar todos los productos:', err);
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
