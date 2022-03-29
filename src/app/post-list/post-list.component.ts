import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

type Section = {
  type: string;
  value: string;
};

type Post = {
  title: string;
  titlePhotoURL: string;
  sections: Section[];
  createdAt: string;
  modifiedAt: Date;
};

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  isScreenMediumOrLarger = false;
  posts: Post[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(({ matches }: BreakpointState) => {
        this.isScreenMediumOrLarger = !!matches;

        console.log(this.isScreenMediumOrLarger);
      });
  }

  getColumnNumber() {
    return this.isScreenMediumOrLarger ? 3 : 1;
  }
}
