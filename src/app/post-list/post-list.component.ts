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
  modifiedAt: string;
};

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor() {}

  ngOnInit(): void {}
}
