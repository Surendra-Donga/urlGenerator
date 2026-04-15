import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendUrl = process.env.BACKEND_URL;
    console.log("Calling Backend URL for register:", `${backendUrl}/api/v1/auth/register`);
    
    if (!backendUrl) {
       return NextResponse.json({ error: "BACKEND_URL environment variable is missing" }, { status: 500 });
    }

    const response = await fetch(`${backendUrl}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.error || "Registration failed" }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
