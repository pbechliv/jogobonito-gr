import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Post } from '../types/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  isScreenMediumOrLarger = false;
  posts: Post[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.authService.user);
      console.log(this.authService.isLoading);
      console.log(this.authService.isSignedIn);
    }, 500);

    console.log(this.authService.user);
    console.log(this.authService.isLoading);
    console.log(this.authService.isSignedIn);
  }
}
