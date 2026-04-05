import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";


const TEAM = ["pol@anguria.tech", "gerard@anguria.tech", "oriol@anguria.tech"];

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Anguria Contact <onboarding@resend.dev>",
    to: TEAM,
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:monospace;background:#000;color:#fff;padding:32px;border-radius:12px;max-width:560px">
        <p style="color:#f97316;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px">// new contact · anguria.tech</p>
        <h2 style="font-size:22px;font-weight:900;margin:0 0 4px">${name}</h2>
        <p style="color:#666;font-size:13px;margin:0 0 24px">${email}</p>
        <div style="border-top:1px solid #1a1a1a;padding-top:20px;color:#aaa;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>
        <p style="margin:24px 0 0;color:#333;font-size:11px">Reply directly to this email — it goes straight to ${email}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
