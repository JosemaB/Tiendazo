import { Component } from '@angular/core';
import { CardCartComponent } from "./components/cardCart/cardCart.component";

@Component({
  selector: 'modal-cart',
  imports: [CardCartComponent],
  templateUrl: './modalCart.component.html'
})
export class ModalCartComponent {


}
