import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("Authorization");

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch("http://localhost:8080/api/v1/urls/my-urls", {
      method: "GET",
      headers: {
        "Authorization": auth,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch URLs" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
