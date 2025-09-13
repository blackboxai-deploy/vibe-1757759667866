import { NextRequest, NextResponse } from 'next/server';
import { reportsStore } from '@/lib/reports-store';

interface ReviewReportRequest {
  reportId: string;
  action: 'resolve' | 'dismiss';
  adminId: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReviewReportRequest = await request.json();
    const { reportId, action, adminId, notes } = body;

    // Validation
    if (!reportId || !action || !adminId) {
      return NextResponse.json(
        { error: 'Report ID, action, and admin ID are required' },
        { status: 400 }
      );
    }

    if (!['resolve', 'dismiss'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be either resolve or dismiss' },
        { status: 400 }
      );
    }

    // Review report
    const result = reportsStore.reviewReport(reportId, adminId, action, notes);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Report ${action === 'resolve' ? 'resolved' : 'dismissed'} successfully`,
      action: action
    });
  } catch (error) {
    console.error('Review report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}