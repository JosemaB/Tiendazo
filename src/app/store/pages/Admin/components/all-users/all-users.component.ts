import { Component, DestroyRef, inject, ElementRef } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { StringUtils } from '@shared/utils/string.utils';
import { Products } from '@store/interfaces/product.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeleteConfirmationComponent } from '@shared/components/modalDeleteConfirmation/modalDeleteConfirmation.component';
import { UserService } from '@store/services/user.service';
import { UserInterface } from '@store/interfaces/user.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'all-users',
  imports: [RouterModule, MatPaginatorModule],
  templateUrl: './all-users.component.html',
})
export class AllUsersComponent {

  userService = inject(UserService);
  readonly dialog = inject(MatDialog);
  stringUtils = inject(StringUtils);
  destroyRef = inject(DestroyRef);

  users: UserInterface = {};
  searchValue = '';
  totalItems = 0;
  pageSize = 20;
  currentPage = 0;


  ngOnInit(): void {
    this.userService.getAllUser(1, 20).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (responses: UserInterface) => {
        this.users = responses;
      },
      error: (err) => {
        console.error('Error al cargar todos los productos:', err);
      }
    })

  }

  onPageChange(event: PageEvent) {
    this.userService.getAllUser(event.pageIndex + 1, event.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: Products) => {
          this.users = responses;
        },
        error: (err) => {
          console.error('Error al cargar todos los productos:', err);
        }
      })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onTyping(value: string) {
    this.userService.getSearchUser(value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: Products) => {
          this.users = responses;
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
