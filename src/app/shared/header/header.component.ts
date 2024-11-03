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
  isAdvancedSearchOpen: boolean = false;
  private clickedInsidePopup = false;
  @ViewChild('searchInput') searchInput!: ElementRef;
  showAutocomplete: boolean = false;
  isNavOpen: boolean = false;
  isUserProfileDropdownOpen: boolean = false;

  suggestions = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 10',
    'Option 11',
    'Option 12',
  ];
  filteredSuggestions = this.suggestions;
  searchTerm: string = ''; // Property for two-way binding
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
    console.log('Navigation menu toggled');
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

  openAdvancedSearch() {
    this.isAdvancedSearchOpen = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus(); // Focus the input field
    }, 0);
  }

  closeAdvancedSearch() {
    this.isAdvancedSearchOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const searchContainer = document.querySelector('.search-bar');

    // Check if the click is outside the search container
    if (searchContainer && !searchContainer.contains(target)) {
      this.closeAdvancedSearch();
    }
  }

  performAdvancedSearch(search: any) {
    // Logic to perform the advanced search
    console.log('Performing advanced search...', search);
  }
  onSearchInput(value: string) {
    this.filteredSuggestions = this.suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    this.showAutocomplete = this.filteredSuggestions.length > 0;
  }

  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.showAutocomplete = false;
  }

  clearSearchInput(inputElement: HTMLInputElement): void {
    this.searchTerm = ''; // Clear the search term
    inputElement.value = ''; // Clear the input field
    this.filteredSuggestions = this.suggestions; // Reset suggestions
    this.showAutocomplete = false; // Hide autocomplete
  }
}
