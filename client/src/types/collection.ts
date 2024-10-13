type Formats = "DVD" | "Blu-ray" | "4K UHD";
type MediaType = "Movie" | "TV Show";

export type Movie = {
  _id: string;
  title: string;
  type: MediaType;
  format: Formats;
  watched: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CollectionInfo = {
  formats: Format[];
  total: number;
};

export type Format = {
  _id: Formats;
  count: number;
};
