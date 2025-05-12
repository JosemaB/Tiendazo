import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';


@Component({
  selector: 'main-layout',
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './mainLayout.component.html',
})
export class MainLayoutComponent { }
