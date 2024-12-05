import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'carglass-case';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.loadTokenFromStorage();
  }

}
