import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { combineLatest, filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    NavbarComponent,
    UserMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  pageTitleOrUserName: string = 'Dashboard';
  showAutocomplete: boolean = false;
  isNavOpen: boolean = false;
  isUserProfileDropdownOpen: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    combineLatest([
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null)
      ),
      this.activatedRoute.data,
    ])
      .pipe(map(() => this.getRouteTitle(this.activatedRoute)))
      .subscribe((title: string | undefined) => {
        this.pageTitleOrUserName = title || 'Dashboard';
      });
  }

  private getRouteTitle(route: ActivatedRoute): string | undefined {
    let activeRoute = route;
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }
    return activeRoute.snapshot.data['title'];
  }
  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  closeNav() {
    this.isNavOpen = false;
  }

  userProfileMenu() {
    this.isUserProfileDropdownOpen = !this.isUserProfileDropdownOpen;
  }

  closeUserMenu() {
    this.isUserProfileDropdownOpen = false;
  }
}
