import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, auth } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_URL;
    console.log("Calling Backend URL:", `${backendUrl}/api/v1/urls/shorten`);
    
    if (!backendUrl) {
       return NextResponse.json({ error: "BACKEND_URL environment variable is missing" }, { status: 500 });
    }

    const response = await fetch(`${backendUrl}/api/v1/urls/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || "Backend error" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
