import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isSignedIn() {
    return this.authService.isSignedIn;
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('');
  }
}
