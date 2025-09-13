import { NextRequest, NextResponse } from 'next/server';
import { reportsStore } from '@/lib/reports-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const limit = searchParams.get('limit');

    const reports = reportsStore.getAllReports({
      status: status as any,
      priority: priority as any,  
      limit: limit ? parseInt(limit) : undefined
    });

    const stats = reportsStore.getReportStats();

    return NextResponse.json({
      success: true,
      reports,
      stats,
      total: reports.length
    });
  } catch (error) {
    console.error('Admin get reports error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}