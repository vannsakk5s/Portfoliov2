import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  isDarkMode = signal<boolean>(true);

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      this.isDarkMode.set(isDark);
    }
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    if (typeof window !== 'undefined') {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
