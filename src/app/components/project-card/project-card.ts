import { Component, input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  title = input.required<string>();
  description = input.required<string>();
  tags = input.required<string[]>();
  demoLink = input<string>('');
  githubLink = input<string>('#');

  showPopup = false;
  popupTimeout: any;

  onDemoClick(event: Event) {
    if (!this.demoLink() || this.demoLink() === '#') {
      event.preventDefault();
      this.showPopup = true;
      if (this.popupTimeout) {
        clearTimeout(this.popupTimeout);
      }
      this.popupTimeout = setTimeout(() => {
        this.showPopup = false;
      }, 3000);
    }
  }

  closePopup() {
    this.showPopup = false;
    if (this.popupTimeout) {
      clearTimeout(this.popupTimeout);
    }
  }
}
