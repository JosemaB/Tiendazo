import { Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { ModalDeleteConfirmationComponent } from '@shared/components/modalDeleteConfirmation/modalDeleteConfirmation.component';
import { StringUtils } from '@shared/utils/string.utils';
import { CommentsInterface } from '@store/interfaces/comments.interface';
import { CommentsService } from '@store/services/comments.service';

@Component({
  selector: 'all-comments',
  imports: [RouterModule, MatPaginatorModule],
  templateUrl: './all-comments.component.html',
})
export class AllCommentsComponent {

  commentsService = inject(CommentsService);
  readonly dialog = inject(MatDialog);
  stringUtils = inject(StringUtils);
  destroyRef = inject(DestroyRef);

  comments: CommentsInterface = {};
  searchValue = '';
  totalItems = 0;
  pageSize = 20;
  currentPage = 0;


  ngOnInit(): void {
    this.commentsService.getAllComments(1, 20).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (responses: CommentsInterface) => {
        this.comments = responses;
      },
      error: (err) => {
        console.error('Error al cargar todos los comentarios:', err);
      }
    })

  }

  onPageChange(event: PageEvent) {
    this.commentsService.getAllComments(event.pageIndex + 1, event.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: CommentsInterface) => {
          this.comments = responses;
        },
        error: (err) => {
          console.error('Error al cargar todos los comentarios:', err);
        }
      })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onTyping(value: string) {
    this.commentsService.getSearchComment(value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (responses: CommentsInterface) => {
          this.comments = responses;
          this.searchValue = value;
        },
        error: (err) => {
          console.error('Error al cargar todos los comentarios:', err);
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
