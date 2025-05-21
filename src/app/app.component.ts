import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tiendazo';
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  ngOnInit() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.HSStaticMethods) {
              window.HSStaticMethods.autoInit();
            }
          }, 500);
        }
        if (event instanceof NavigationStart && event.url !== '/auth/login') {
          this.snackBar.dismiss();
        }
      });
  }
}
