import { getAccessToken } from "../../../lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Error fetching access_token from Spotify" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Access token obtained successfully", accessToken: accessToken },
    { status: 200 }
  );
}
