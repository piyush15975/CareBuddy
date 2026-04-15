import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function getUserEmailFromAuth() {
  const { sessionClaims } = auth();
  const claims = sessionClaims as Record<string, any> | undefined;

  return (
    claims?.email ??
    claims?.emailAddress ??
    claims?.primaryEmailAddress?.emailAddress ??
    claims?.email_addresses?.[0]?.email_address ??
    null
  );
}

function getUserEmailFromRequest(req: NextRequest, bodyEmail?: string) {
  const { searchParams } = new URL(req.url);

  return bodyEmail ?? searchParams.get("userEmail") ?? getUserEmailFromAuth();
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const userEmail = getUserEmailFromRequest(req, body?.userEmail);

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await db
      .select()
      .from(usersTable)
      //@ts-ignore
      .where(eq(usersTable.email, userEmail));
    if (users?.length == 0) {
      const result = await db
        .insert(usersTable)
        .values({
          name: body?.name ?? userEmail,
          email: userEmail,
          credits: 10,
          //@ts-ignore
        }).returning({ usersTable });
      return NextResponse.json(result[0]?.usersTable);
    }
    return NextResponse.json(users[0]);
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function GET(req: NextRequest) {
  const userEmail = getUserEmailFromRequest(req);

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ email: userEmail });
}
