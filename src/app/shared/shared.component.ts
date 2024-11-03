import { Component, inject } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, CommonModule],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.scss',
})
export class SharedComponent {
  showHeader: boolean = false;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route?.snapshot.data['showHeader'] ?? false;
        })
      )
      .subscribe((showHeader) => {
        this.showHeader = showHeader;
      });
  }
}
