type Section = {
  type: string;
  value: string;
};

type Post = {
  id: string;
  title: string;
  lead: string;
  titlePhotoURL: string;
  sections: Section[];
  labels: string[];
  relatedPosts: string[];
  createdAt: string;
  modifiedAt: string;
};
