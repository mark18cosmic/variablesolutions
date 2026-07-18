import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.md");

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  idea?: string;
};

function clean(value: unknown, max = 4000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 200);
  const budget = clean(body.budget, 60);
  const idea = clean(body.idea);

  if (!name || !email || !idea) {
    return NextResponse.json(
      { error: "Name, email and idea are required." },
      { status: 400 }
    );
  }

  const timestamp = new Date().toISOString();
  const entry = [
    ``,
    `## ${name} — ${timestamp}`,
    ``,
    `- **Email:** ${email}`,
    `- **Company:** ${company || "—"}`,
    `- **Budget:** ${budget || "—"}`,
    ``,
    `**Idea:**`,
    ``,
    idea
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n"),
    ``,
    `---`,
    ``,
  ].join("\n");

  try {
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await fs.appendFile(LEADS_FILE, entry, "utf8");
  } catch {
    return NextResponse.json(
      { error: "Could not save your enquiry. Please email us instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
