import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'carousel-main',
  imports: [],
  templateUrl: './carouselMain.component.html',
})
export class CarouselMainComponent implements OnDestroy {
  ngOnDestroy() {
    // Elimina el carrusel al salir de la página (para evitar conflictos al volver)
    const carousel = document.querySelector('[data-carousel="slide"]');
    if (carousel) {
      carousel.innerHTML = carousel.innerHTML; // Resetea el HTML (workaround)
    }
  }
}
