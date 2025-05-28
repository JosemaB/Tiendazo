import { UserService } from '@store/services/user.service';
import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { distinctUntilChanged, forkJoin, Observable, tap } from 'rxjs';
import { ProductsService } from '@store/services/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Products } from '@store/interfaces/product.interface';
import { CartsService } from '@store/services/carts.service';
import { CommentsService } from '@store/services/comments.service';
import { UserInterface } from '@store/interfaces/user.interface';
import { CommentsInterface } from '@store/interfaces/comments.interface';
import { CartsInterface } from '@store/interfaces/carts.interface';

Chart.register(...registerables);

@Component({
  selector: 'admin-resumen',
  standalone: true,
  imports: [MatIconModule, RouterModule, BaseChartDirective],
  templateUrl: './resumen.component.html',
})
export class ResumenComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  userService = inject(UserService);
  cartsService = inject(CartsService);
  productsService = inject(ProductsService);
  commentsService = inject(CommentsService);
  destroyRef = inject(DestroyRef);

  users = 0;
  carts = 0;
  products = 0;
  comments = 0;

  ngOnInit(): void {
    forkJoin([
      this.getAllProducts(),
      this.getAllUsers(),
      this.getAllComments(),
      this.getAllCarts(),
    ]).subscribe(() => {
      this.updateChart()
    });


  }

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Users', 'Carts', 'Products', 'Comments'],
    datasets: [
      {
        label: 'Totales',
        data: [this.users, this.carts, this.products, this.comments],
        backgroundColor: ['#ec4899', '#f472b6', '#be185d', '#db2777'],
        borderWidth: 1,
      },
    ],
  };

  private getAllProducts(): Observable<Products> {
    return this.productsService.getAllProducts().pipe(
      takeUntilDestroyed(this.destroyRef),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      tap((products) => {
        this.products = products.total!;
      })
    );
  }

  private getAllUsers(): Observable<UserInterface> {
    return this.userService.getAllUser().pipe(
      takeUntilDestroyed(this.destroyRef),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      tap((users) => {
        this.users = users.total!;
      })
    );
  }
  private getAllComments(): Observable<CommentsInterface> {
    return this.commentsService.getAllComments().pipe(
      takeUntilDestroyed(this.destroyRef),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      tap((comments) => {
        this.comments = comments.total!;
      })
    );
  }

  private getAllCarts(): Observable<CartsInterface> {
    return this.cartsService.getAllCarts().pipe(
      takeUntilDestroyed(this.destroyRef),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      tap((carts) => {
        this.carts = carts.total!;
      })
    );
  }

  private updateChart(): void {
    this.barChartData.datasets[0].data = [this.users, this.carts, this.products, this.comments];
    this.chart?.update();
  }

}
