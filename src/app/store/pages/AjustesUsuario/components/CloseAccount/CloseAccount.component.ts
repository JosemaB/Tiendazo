import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCloseAccountComponent } from './components/ModalCloseAccount/ModalCloseAccount.component';

@Component({
  selector: 'close-account',
  imports: [],
  templateUrl: './CloseAccount.component.html',
})
export class CloseAccountComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalCloseAccountComponent, {
      width: '1000px',
      position: { top: '150px' },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
