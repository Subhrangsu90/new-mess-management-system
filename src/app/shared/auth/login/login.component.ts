import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  loginData = {
    email: '',
    password: '',
  };

  onLogin(form: any) {
    if (form.valid) {
      // Retrieve stored user data from localStorage
      const storedUserData = localStorage.getItem('userData');

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        // Check if the entered email and password match the stored data
        if (
          userData.email === this.loginData.email &&
          userData.password === this.loginData.password
        ) {
          console.log('Login successful!', userData);

          // Pass user data and navigate to the dashboard or home
          this.router.navigate(['/dashboard']);
        } else {
          alert('Incorrect email or password!');
        }
      }
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
