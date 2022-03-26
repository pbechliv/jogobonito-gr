import { Component } from '@angular/core';

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
export class PostListComponent {
  posts: Post[] = [];

  constructor() {}
}
