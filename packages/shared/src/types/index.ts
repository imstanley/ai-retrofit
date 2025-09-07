export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface IntercomAction {
  id: string;
  user_id: string;
  action: 'buzz' | 'status_check';
  status: 'pending' | 'success' | 'failed';
  created_at: string;
  completed_at?: string;
  error_message?: string;
}

export interface IntercomStatus {
  is_online: boolean;
  last_buzz: string | null;
  battery_level?: number;
  signal_strength?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
