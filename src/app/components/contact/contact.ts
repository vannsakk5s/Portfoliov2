import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = '';
  email = '';
  message = '';
  
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  async onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.name || !this.email || !this.message) return;

    this.isSubmitting.set(true);
    this.submitSuccess.set(false);
    this.submitError.set(false);

    // TODO: REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
    const SERVICE_ID = 'service_yepzz0s';
    const TEMPLATE_ID = 'template_mog4pps';
    const PUBLIC_KEY = 'LtUinueO0quQjHehw';

    const templateParams = {
      from_name: this.name,
      reply_to: this.email,
      message: this.message,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      this.submitSuccess.set(true);
      this.name = '';
      this.email = '';
      this.message = '';
    } catch (error) {
      console.error('EmailJS Error:', error);
      this.submitError.set(true);
    } finally {
      this.isSubmitting.set(false);
      
      // Hide success message after 5 seconds
      if (this.submitSuccess()) {
        setTimeout(() => this.submitSuccess.set(false), 5000);
      }
    }
  }

  fakeSuccess() {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.submitError.set(false);
      setTimeout(() => this.submitSuccess.set(false), 5000);
    }, 1000);
  }
}
