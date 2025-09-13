import { NextRequest, NextResponse } from 'next/server';
import { reportsStore } from '@/lib/reports-store';

interface CreateReportRequest {
  postId: string;
  reason: string;
  description?: string;
  reporterId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateReportRequest = await request.json();
    const { postId, reason, description, reporterId } = body;

    // Validation
    if (!postId || !reason) {
      return NextResponse.json(
        { error: 'Post ID and reason are required' },
        { status: 400 }
      );
    }

    // Create report
    const result = reportsStore.createReport({
      postId,
      reason,
      description,
      reporterId
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      report: result.report,
      message: 'Report submitted successfully. Our moderation team will review it.'
    });
  } catch (error) {
    console.error('Create report error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const reason = searchParams.get('reason');
    const limit = searchParams.get('limit');

    const reports = reportsStore.getAllReports({
      status: status as any,
      priority: priority as any,
      reason: reason || undefined,
      limit: limit ? parseInt(limit) : undefined
    });

    const stats = reportsStore.getReportStats();

    return NextResponse.json({
      success: true,
      reports,
      stats,
      categories: reportsStore.getCategories()
    });
  } catch (error) {
    console.error('Get reports error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}