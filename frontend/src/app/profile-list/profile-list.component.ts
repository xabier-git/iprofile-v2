import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile.model';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css'],
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = [];
  editingId: string | null = null;
  editNickname = '';
  editNombre = '';
  editApellido = '';
  editCodigoSituacionSentimental = '';
  editEquipoActual = '';

  constructor(private profileService: ProfileService) {
    console.log('ProfileListComponent initialized');
   }

  ngOnInit(): void {
    console.log('ProfileListComponent.NgOnInit called');
    this.profileService.fetchProfiles(); // <-- Llama aquí, después de login
    this.profileService.profiles$.subscribe(profiles => { 
      console.log('ProfileListComponent.NgOnInit profiles:', profiles);
      this.profiles = profiles; 
    });
  }

  deleteProfile(id: string) {
    console.log('ProfileListComponent Deleting profile with id:', id);
    this.profileService.deleteProfile(id);
  }

  enableEdit(profile: Profile) {
    console.log('ProfileListComponent Enabling edit for profile:', profile);
    this.editingId = profile._id!;
    this.editNickname = profile.nickname;
    this.editNombre = profile.nombre;
    this.editApellido = profile.apellido;
    this.editCodigoSituacionSentimental = profile.codigoSituacionSentimental;
    this.editEquipoActual = profile.equipoActual;
  }

  cancelEdit() { 
    console.log('ProfileListComponent Edit cancelled');
    this.editingId = null;
    this.editNickname = '';
    this.editNombre = '';
    this.editApellido = '';
    this.editCodigoSituacionSentimental = '';
    this.editEquipoActual = '';
  }

  updateProfile() {
    console.log('ProfileListComponent Updating profile:', this.editNickname, this.editNombre, this.editApellido, this.editCodigoSituacionSentimental, this.editEquipoActual);
    if (!this.editNickname) return;
    const updated: Profile = {
      _id: this.editingId!,
      nickname: this.editNickname,
      nombre: this.editNombre,
      apellido: this.editApellido,  
      codigoSituacionSentimental: this.editCodigoSituacionSentimental,
      equipoActual: this.editEquipoActual 
    };
    this.profileService.updateProfile(updated);
    this.cancelEdit();
  }
}