import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const code = (await params).code;
  
  // The backend handles the final redirect.
  // We just redirect the browser to the backend redirection endpoint.
  const backendUrl = `http://localhost:8080/api/v1/urls/${code}`;
  
  return NextResponse.redirect(backendUrl);
}
