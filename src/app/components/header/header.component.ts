import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  btnLight = true;
  btnDark = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      this.toggleThemeDark();
    } else {
      this.toggleThemeLight();
    }
  }

  toggleThemeDark() {
    this.btnDark = true;
    this.btnLight = false;;

    document.documentElement.classList.add('dark-theme');

    const header = document.querySelector('header');
    header?.classList.add('dark-theme');

    localStorage.setItem('theme', 'dark');
  }

  toggleThemeLight() {
    this.btnDark = false;
    this.btnLight = true;;

    document.documentElement.classList.remove('dark-theme');

    const header = document.querySelector('header');
    header?.classList.remove('dark-theme');

    localStorage.setItem('theme', 'light');
  }

}
