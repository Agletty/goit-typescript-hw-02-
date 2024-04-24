export interface Image {
  id: string;
  alt_description: string;
  likes: number;
  description: string;
  created_at: string;
  tags: { title: string }[];
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
    social: {
      portfolio_url: string;
    };
    location: string;
  };
}

export interface ApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}
