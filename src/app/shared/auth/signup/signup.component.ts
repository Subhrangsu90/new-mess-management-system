import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private router = inject(Router);
  signupData = {
    name: '',
    email: '',
    password: '',
  };

  onSubmit(form: any) {
    if (form.valid) {
      localStorage.setItem('userData', JSON.stringify(this.signupData));
      console.log('Sign-up data:', this.signupData);
      this.router.navigate(['/']);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
