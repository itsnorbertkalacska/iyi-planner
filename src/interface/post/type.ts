export interface Image {
  localUri: string;
}

export interface Post {
  id: number;
  caption?: string;
  image?: Image;
}
