export interface Section {
  type: string;
  value: string;
}

export interface Post {
  id: string;
  title: string;
  lead: string;
  titlePhoto: string;
  sections: Section[];
  labels: string[];
  tags: string[];
  relatedPosts: string[];
  createdAt: string;
  modifiedAt: string;
}
