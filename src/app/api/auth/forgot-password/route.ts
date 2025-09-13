import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '@/lib/users-store';

interface ForgotPasswordRequest {
  email: string;
}

// Simulate sending email (in production, integrate with email service)
async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  // In production, you would integrate with an email service like:
  // - SendGrid
  // - AWS SES  
  // - Nodemailer with SMTP
  // - Resend
  
  console.log(`[EMAIL SIMULATION] Password reset email sent to: ${email}`);
  console.log(`[EMAIL SIMULATION] Reset link: http://localhost:3000/auth/reset-password?token=${token}`);
  console.log(`[EMAIL SIMULATION] Token: ${token}`);
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return true; // Always successful in demo
}

export async function POST(request: NextRequest) {
  try {
    const body: ForgotPasswordRequest = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Create password reset token
    const result = usersStore.createPasswordResetToken(email);
    
    if (result.success && result.token) {
      // Send email (simulate in development)
      try {
        await sendPasswordResetEmail(email, result.token);
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the request if email fails - for better UX
      }
    }

    // Always return success for security (don't reveal if email exists)
    return NextResponse.json({
      success: true,
      message: 'If an account with this email exists, password reset instructions have been sent.'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}