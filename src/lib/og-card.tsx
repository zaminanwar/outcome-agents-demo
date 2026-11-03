import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const ogSize = { width: 1200, height: 630 };

/**
 * 1200×630 social card, prerendered at build time. Self-contained (next/og
 * default font, no network) so it works under `output: export`. Same neutral
 * palette as the page.
 */
export function ogCard({
  title,
  description,
  chips = [],
}: {
  title: string;
  description?: string;
  chips?: string[];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafafa",
          color: "#171717",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "#171717",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "999px",
                border: "4px solid #fafafa",
              }}
            />
          </div>
          <span style={{ fontSize: "28px", fontWeight: 600 }}>{siteConfig.name}</span>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "20px",
              color: "#737373",
              border: "1px solid #d4d4d4",
              borderRadius: "999px",
              padding: "4px 14px",
            }}
          >
            Demo concept
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
          {description && (
            <div style={{ fontSize: "28px", color: "#525252", maxWidth: "940px", lineHeight: 1.35 }}>
              {description}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "22px", color: "#737373" }}>
          {chips.map((chip, i) => (
            <span key={chip} style={{ display: "flex", gap: "14px" }}>
              {i > 0 && <span style={{ color: "#d4d4d4" }}>•</span>}
              {chip}
            </span>
          ))}
        </div>
      </div>
    ),
    ogSize
  );
}
