import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #isLoading = true;
  #isSignedIn = false;

  constructor(private fireAuth: Auth) {
    this.initialize();
  }

  get user() {
    return this.fireAuth.currentUser;
  }

  get isLoading() {
    return this.#isLoading;
  }

  get isSignedIn() {
    return this.#isSignedIn;
  }

  initialize() {
    onAuthStateChanged(this.fireAuth, (user) => {
      this.#isLoading = false;
      this.#isSignedIn = !!user;
    });
  }

  async signIn(email = 'panos.bechlivanos@gmail.com', password = '110290pb') {
    try {
      return await signInWithEmailAndPassword(this.fireAuth, email, password);
    } catch (error) {
      return error;
    }
  }

  async signOut() {
    try {
      return await signOut(this.fireAuth);
    } catch (error) {
      return error;
    }
  }
}
