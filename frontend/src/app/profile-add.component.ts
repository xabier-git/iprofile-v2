import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-add.component.html',
})
export class ProfileAddComponent {
  profile: Profile = {
    nickname: '',
    nombre: '',
    apellido: '',
    codigoSituacionSentimental: '',
    equipoActual: ''
  };

   constructor(private profileService: ProfileService) {
    console.log('ProfileAddComponent initialized');
   }

  addProfile() {
    console.log('Adding profile:', this.profile);
    if (!this.profile.nickname) return;

    this.profileService.addProfile(this.profile);
    this.profile = {
      nickname: '',
      nombre: '',
      apellido: '',
      codigoSituacionSentimental: '',
      equipoActual: ''      
   }
 }
}