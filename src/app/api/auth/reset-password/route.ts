import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '@/lib/users-store';

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ResetPasswordRequest = await request.json();
    const { token, newPassword, confirmPassword } = body;

    // Validation
    if (!token || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Reset password
    const result = usersStore.resetPassword(token, newPassword);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}