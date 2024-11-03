import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  private router = inject(Router);
  isNavOpen = false;
  @Output() closeUserMenuBar = new EventEmitter<void>();

  toggleNav() {
    console.log(this.isNavOpen);
    this.isNavOpen = !this.isNavOpen;
  }

  onLogout() {
    // Clear login data from localStorage
    localStorage.removeItem('userData');
    this.router.navigate(['']);
  }

  onClose() {
    this.closeUserMenuBar.emit();
  }
}
