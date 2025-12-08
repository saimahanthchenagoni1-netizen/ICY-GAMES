
export interface Game {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number; // 0-5
  plays: string; // e.g. "1.2M"
  description: string;
  isHot?: boolean;
  isNew?: boolean;
  romUrl?: string;
  customHtml?: string;
  url?: string;
  gridSize?: 'small' | 'medium' | 'large' | 'tall' | 'wide'; // For Poki-style mosaic
}

export type Category = 
  | 'All' 
  | 'Action' 
  | 'Puzzle' 
  | 'Racing' 
  | 'Strategy' 
  | 'Sports' 
  | 'Adventure'
  | 'Apps';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface AppSettings {
  snowIntensity: 'none' | 'light' | 'blizzard';
  customCursor: boolean;
  brightness: number; // 50 to 150
  theme: 'dark' | 'light';
}
