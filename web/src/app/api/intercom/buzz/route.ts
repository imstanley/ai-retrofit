import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse, IntercomAction } from '@ai-retrofit/shared';

export async function POST(request: NextRequest) {
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

    // Simulate servo control (replace with actual hardware control)
    const servoControlSuccess = await simulateServoControl();
    
    if (!servoControlSuccess) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Servo control failed'
      }, { status: 500 });
    }

    // Log the action to database
    const { data: action, error: dbError } = await supabase
      .from('intercom_actions')
      .insert({
        user_id: user.id,
        action: 'buzz',
        status: 'success',
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Don't fail the request if logging fails
    }

    return NextResponse.json<ApiResponse<IntercomAction>>({
      success: true,
      data: action,
      message: 'Door buzzed successfully'
    });

  } catch (error) {
    console.error('Buzz API error:', error);
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Simulate servo control - replace with actual hardware integration
async function simulateServoControl(): Promise<boolean> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate 95% success rate
  return Math.random() > 0.05;
}
