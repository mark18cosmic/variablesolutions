import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.md");
const GITHUB_REPO = process.env.GITHUB_REPO || "mark18cosmic/variablesolutions";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

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

function buildBody({
  email,
  company,
  budget,
  idea,
}: {
  email: string;
  company: string;
  budget: string;
  idea: string;
}) {
  return [
    `**Email:** ${email}`,
    `**Company:** ${company || "—"}`,
    `**Budget:** ${budget || "—"}`,
    ``,
    `**Idea:**`,
    ``,
    idea,
  ].join("\n");
}

/** Files a GitHub issue on the site's repo so leads show up where the team can see them. */
async function createGithubIssue(fields: {
  name: string;
  email: string;
  company: string;
  budget: string;
  idea: string;
}) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      title: `New project enquiry — ${fields.name}`,
      body: buildBody(fields),
      labels: ["lead"],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`GitHub API responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

/** Local fallback used only when GITHUB_TOKEN isn't configured (e.g. local dev). */
async function appendLocalLead(fields: {
  name: string;
  email: string;
  company: string;
  budget: string;
  idea: string;
}) {
  const timestamp = new Date().toISOString();
  const entry = [
    ``,
    `## ${fields.name} — ${timestamp}`,
    ``,
    `- **Email:** ${fields.email}`,
    `- **Company:** ${fields.company || "—"}`,
    `- **Budget:** ${fields.budget || "—"}`,
    ``,
    `**Idea:**`,
    ``,
    fields.idea
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n"),
    ``,
    `---`,
    ``,
  ].join("\n");

  await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
  await fs.appendFile(LEADS_FILE, entry, "utf8");
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

  const fields = { name, email, company, budget, idea };

  try {
    if (GITHUB_TOKEN) {
      await createGithubIssue(fields);
    } else {
      // No token configured — keep local dev working, but this won't
      // reach GitHub. Set GITHUB_TOKEN (and optionally GITHUB_REPO) in
      // the environment to file leads as issues instead.
      console.warn(
        "GITHUB_TOKEN not set — saving enquiry to data/leads.md locally instead of GitHub."
      );
      await appendLocalLead(fields);
    }
  } catch (err) {
    console.error("start-project submission failed:", err);
    return NextResponse.json(
      { error: "Could not save your enquiry. Please email us instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
