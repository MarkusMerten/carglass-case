import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'carglass-case';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.loadTokenFromStorage();
  }

}
