import { createServerSupabase } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createServerSupabase();

    // Get session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user data
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return NextResponse.json({ error: userError?.message || 'User not found' }, { status: 500 });
    }

    // Return user data
    return NextResponse.json({
      user: {
        id: userData.user.id,
        email: userData.user.email,
        created_at: userData.user.created_at,
        last_sign_in_at: userData.user.last_sign_in_at,
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
