import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card, drawn with the brand marks rather than a screenshot. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d1114",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: "#2ee6a8",
            opacity: 0.12,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -140,
            width: 460,
            height: 460,
            borderRadius: 460,
            background: "#2f8ef0",
            opacity: 0.12,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", position: "relative", width: 64, height: 64 }}>
            <div style={{ position: "absolute", left: 16, top: 0, width: 32, height: 32, borderRadius: 32, background: "#2ee6a8", display: "flex" }} />
            <div style={{ position: "absolute", left: 0, top: 26, width: 32, height: 32, borderRadius: 32, background: "#2ee6a8", opacity: 0.55, display: "flex" }} />
            <div style={{ position: "absolute", left: 32, top: 26, width: 32, height: 32, borderRadius: 32, background: "#2f8ef0", opacity: 0.7, display: "flex" }} />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#f2f5f4", letterSpacing: -0.5 }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#f2f5f4", letterSpacing: -2.5 }}>
            Any problem.
          </div>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#45ecb5", letterSpacing: -2.5 }}>
            One solution.
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 30, color: "#98a29d", maxWidth: 900 }}>
            HR, accounting, POS, websites, apps and custom software — built in
            the Maldives.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Roster · HR", "Ledgr · Accounting", "Super App · All in one"].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(242,245,244,0.18)",
                color: "#c5ccc8",
                fontSize: 24,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
