// src/app/api/submissions/route.ts
import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcmZiPZKWW-nvvh7mcmGSGEfaXpdS19DTb5VpAtJrgWegvgFOVWq_DHvuBMBgVxrKl/exec';

export async function GET() {
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL);
    const data = await res.json();
    return NextResponse.json({ status: 'success', data: data.data || [] });
  } catch (err) {
    console.error('Error fetching submissions:', err);
    return NextResponse.json({ status: 'error', error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json({ status: data.status || 'added', timestamp: data.timestamp });
  } catch (err) {
    console.error('Error adding submission:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    // Send as POST with action=update to Google Script
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json({ status: data.status || 'updated' });
  } catch (err) {
    console.error('Error updating submission:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const params = new URLSearchParams({ action: 'delete', timestamp: body.timestamp });
    const res = await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, { method: 'POST' });
    const data = await res.json();

    // Force correct status if Google Script returns wrong one
    if (data.status !== 'deleted') {
      console.warn('Google Script returned unexpected status:', data);
    }

    return NextResponse.json({ status: data.status || 'deleted' });
  } catch (err) {
    console.error('Error deleting submission:', err);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

