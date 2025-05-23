import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { DialogAnimationsExampleDialogComponent } from './components/dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { UserService } from '@store/services/user.service';
import { SectionTitleComponentComponent } from '@shared/components/SectionTitleComponent/SectionTitleComponent.component';

@Component({
  selector: 'change-avatar-component',
  imports: [MatButtonModule, SectionTitleComponentComponent],
  templateUrl: './changeAvatarComponent.component.html',
})
export class ChangeAvatarComponentComponent {

  readonly dialog = inject(MatDialog);
  userService = inject(UserService)
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: '1000px',
      position: { top: '150px' },
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
