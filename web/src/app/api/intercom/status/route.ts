import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse, IntercomStatus } from '@ai-retrofit/shared';

export async function GET() {
  try {
    const supabase = createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Simulate intercom status - replace with actual hardware status
    const status: IntercomStatus = {
      is_online: true,
      last_buzz: new Date().toISOString(),
      battery_level: Math.floor(Math.random() * 40) + 60, // 60-100%
      signal_strength: Math.floor(Math.random() * 30) + 70 // 70-100%
    };

    return NextResponse.json<ApiResponse<IntercomStatus>>({
      success: true,
      data: status
    });

  } catch (error) {
    console.error('Status API error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
