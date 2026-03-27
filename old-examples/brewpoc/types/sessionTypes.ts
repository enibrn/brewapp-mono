export type Session = {
  id: string;
  client: string;
  os: string;
  device: string;
  location: string;
  ip: string;
  current: boolean;
}

export type SessionList = {
  total: number;
  sessions: Session[];
}