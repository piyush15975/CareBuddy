import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
  try {
    const { notes, selectedDoctor, userEmail: bodyEmail } = await req.json();
    const userEmail = getUserEmailFromRequest(req, bodyEmail);

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessionId = uuidv4();
    //@ts-ignore
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: userEmail,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toString(),
        //@ts-ignore
      }).returning({ SessionChatTable });
    return NextResponse.json(result[0]?.SessionChatTable);
  } catch (e) {
    console.error("session-chat POST error", e);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const userEmail = getUserEmailFromRequest(req);

    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (sessionId == "all") {
      const result = await db
        .select()
        .from(SessionChatTable)
        .where(eq(SessionChatTable.createdBy, userEmail))
        .orderBy(desc(SessionChatTable.id));

      return NextResponse.json(result);
    }

    const result = await db
      .select()
      .from(SessionChatTable)
      .where(eq(SessionChatTable.sessionId, sessionId as string));
    return NextResponse.json(result[0]);
  } catch (e) {
    console.error("session-chat GET error", e);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
