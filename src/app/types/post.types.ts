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
