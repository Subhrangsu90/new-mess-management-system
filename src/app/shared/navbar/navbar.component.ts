import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isNavOpen = false;
  @Output() closeNavbar = new EventEmitter<void>();

  toggleNav() {
    console.log(this.isNavOpen);

    this.isNavOpen = !this.isNavOpen;
  }

  onClose() {
    this.closeNavbar.emit();
  }
}
