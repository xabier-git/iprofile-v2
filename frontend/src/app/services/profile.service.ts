import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile.model';
import { AuthService } from './auth.service';   

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profiles';
  private profilesSubject = new BehaviorSubject<Profile[]>([]);
  profiles$ = this.profilesSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    //this.fetchProfiles();
    console.log('ProfileService initialized');
  }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    console.log('ProfileService.getAuthHeaders() Retrieved token:', token);
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }

  fetchProfiles() {
    this.http.get<Profile[]>(this.apiUrl, this.getAuthHeaders())
      .subscribe(profiles => this.profilesSubject.next(profiles));
    console.log('ProfileService: Fetched profiles:', this.profilesSubject.value);
  }

  addProfile(profile: Profile) {
    console.log('Adding profile:', profile);
    this.http.post<Profile>(this.apiUrl, profile, this.getAuthHeaders())
      .subscribe(
        newProfile => {
          const current = this.profilesSubject.value;
          this.profilesSubject.next([...current, newProfile]);
        }, error => {
          console.error('ProfileService: Error adding profile:', error);
        });
  }

  deleteProfile(id: string) {
    console.log('ProfileService: Deleting profile with id:', id);
    this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders())
      .subscribe(() => {
        const updated = this.profilesSubject.value.filter(c => c._id !== id);
        this.profilesSubject.next(updated);
      });
  }

  updateProfile(profile: Profile) {
    console.log('ProfileService: Updating profile:', profile);
    this.http.put<Profile>(`${this.apiUrl}/${profile._id}`, profile, this.getAuthHeaders())
      .subscribe({
        next: (updated) => {
          const updatedList = this.profilesSubject.value.map(c =>
            c._id === updated._id ? updated : c);
          this.profilesSubject.next(updatedList);
        },
        error: (error) => {
          console.error('ProfileService: Error updating profile: ', error);
        }
      });
  }
}