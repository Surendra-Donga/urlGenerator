import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const code = (await params).code;
    
    const backendBaseUrl = process.env.BACKEND_URL;
    if (!backendBaseUrl) {
      console.error("BACKEND_URL is not defined in environment variables");
      return NextResponse.json({ error: "Backend URL configuration error" }, { status: 500 });
    }

    const backendUrl = `${backendBaseUrl}/api/v1/urls/${code}`;
    
    // Using a 307 Temporary Redirect which is safer for this case
    return NextResponse.redirect(new URL(backendUrl), 307);
  } catch (error: any) {
    console.error("Redirect error:", error);
    return NextResponse.json({ error: "An error occurred during redirection" }, { status: 500 });
  }
}
