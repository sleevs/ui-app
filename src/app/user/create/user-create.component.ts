import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class CreateUserComponent implements OnInit {

  
  cadastroForm!: FormGroup;

  constructor(private router: Router ,
    private formBuilder: FormBuilder, 
    private userService: UserService) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmarSenha: ['', Validators.required]
    }, {
      validator: this.mustMatch('senha', 'confirmarSenha')
    });
  }

  
  get nome() { return this.cadastroForm.get('nome'); }
  get email() { return this.cadastroForm.get('email'); }
  get senha() { return this.cadastroForm.get('senha'); }
  get confirmarSenha() { return this.cadastroForm.get('confirmarSenha'); }

  mustMatch(senha: string, confirmarSenha: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[senha];
      const confirmPasswordControl = formGroup.controls[confirmarSenha];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.userService.createUser(this.cadastroForm.value).subscribe(
        response => {
          console.log('Registro bem-sucedido', response);
         
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Erro ao registrar usuário', error);
          
        }
      );
    }
  }

  navegateToLogin() {

    this.router.navigate(['/login']);
  }
}
