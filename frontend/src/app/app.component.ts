import { Component } from '@angular/core';
import { ProfileAddComponent } from './profile-add.component';
import { ProfileListComponent } from './profile-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileAddComponent, ProfileListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}