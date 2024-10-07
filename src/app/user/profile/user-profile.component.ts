import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';


interface UserProfile {
  id: number;
  nome: string;
  email: string;
  senha: string; 
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [ReactiveFormsModule , CommonModule]
})
export class UserProfileComponent implements OnInit {
  user: UserProfile | undefined;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      this.user = JSON.parse(userProfile);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUser(id: number): void {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Erro ao buscar o usuário:', error);
      }
    );
  }


  onLogout() {
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }
}