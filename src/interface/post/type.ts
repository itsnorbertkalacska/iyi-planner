export interface Image {
  localUri: string;
}

export interface Post {
  id: number;
  caption?: string;
  disabled?: boolean;
  image?: Image;
}
