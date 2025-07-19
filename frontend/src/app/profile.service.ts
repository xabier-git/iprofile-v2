import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Profile } from './profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profiles';
  private profilesSubject = new BehaviorSubject<Profile[]>([]);
  profiles$ = this.profilesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchProfiles();
    console.log('ProfileService initialized');
  }

  fetchProfiles() {
    this.http.get<Profile[]>(this.apiUrl).subscribe(profiles => this.profilesSubject.next(profiles));
    console.log('Fetched profiles:', this.profilesSubject.value);
  }

  addProfile(profile: Profile) {
    console.log('Adding profile:', profile);
    this.http.post<Profile>(this.apiUrl, profile).subscribe(newProfile => {
      const current = this.profilesSubject.value;
      this.profilesSubject.next([...current, newProfile]);
    });
  }

  deleteProfile(id: string) {
    console.log('Deleting profile with id:', id);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      const updated = this.profilesSubject.value.filter(c => c._id !== id);
      this.profilesSubject.next(updated);
    });
  }

  updateProfile(profile: Profile) {
    console.log('Updating profile:', profile);
    this.http.put<Profile>(`${this.apiUrl}/${profile._id}`, profile).subscribe(updated => {
      const updatedList = this.profilesSubject.value.map(c =>
        c._id === updated._id ? updated : c
      );
      this.profilesSubject.next(updatedList);
    });
  }
}