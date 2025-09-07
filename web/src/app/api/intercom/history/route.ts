import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse, IntercomAction } from '@ai-retrofit/shared';

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

    // Get user's intercom action history
    const { data: actions, error: dbError } = await supabase
      .from('intercom_actions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Failed to fetch history'
      }, { status: 500 });
    }

    return NextResponse.json<ApiResponse<IntercomAction[]>>({
      success: true,
      data: actions || []
    });

  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
