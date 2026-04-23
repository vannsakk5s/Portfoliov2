import { Component, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  roles = ['Web Developer', 'UI/UX Designer', 'Full-Stack Developer'];
  currentText = signal('');
  
  private loopNum = 0;
  private isDeleting = false;
  private typingSpeed = 150;
  private timeoutId: any;

  ngOnInit() {
    this.type();
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private type() {
    const i = this.loopNum % this.roles.length;
    const fullText = this.roles[i];

    if (this.isDeleting) {
      this.currentText.set(fullText.substring(0, this.currentText().length - 1));
      this.typingSpeed = 50;
    } else {
      this.currentText.set(fullText.substring(0, this.currentText().length + 1));
      this.typingSpeed = 100;
    }

    if (!this.isDeleting && this.currentText() === fullText) {
      this.typingSpeed = 2000; // Pause at the end
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText() === '') {
      this.isDeleting = false;
      this.loopNum++;
      this.typingSpeed = 500; // Pause before typing next
    }

    this.timeoutId = setTimeout(() => this.type(), this.typingSpeed);
  }
}
