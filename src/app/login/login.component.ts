import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  imports: [ReactiveFormsModule , CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.value).subscribe(
        response => {
          console.log('Login bem-sucedido', response);
        
        localStorage.setItem('userProfile', JSON.stringify(response));
        
        this.router.navigate(['/profile']);
        },
        error => {
          console.error('Erro ao fazer login', error);
        
        }
      );
    }
  }

  navegateTo(): void {
    console.log('NAVEGATION TO');
    this.router.navigate(['/create-user']);
  }
}