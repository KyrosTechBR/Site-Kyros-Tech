import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Kyros Tech - Tecnologia que transforma negócios";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#f8fbff",
          background:
            "radial-gradient(circle at 18% 14%, rgba(0, 200, 255, 0.28), transparent 34%), radial-gradient(circle at 82% 18%, rgba(0, 109, 255, 0.3), transparent 34%), linear-gradient(135deg, #02050b 0%, #031329 54%, #02050b 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0, 200, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 255, 0.07) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.58,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 78,
            width: 300,
            height: 300,
            border: "1px solid rgba(0, 200, 255, 0.28)",
            borderRadius: 42,
            background: "linear-gradient(135deg, rgba(0, 109, 255, 0.16), rgba(0, 200, 255, 0.06))",
            transform: "rotate(8deg)",
          }}
        />
        <main
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px 88px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <div
              style={{
                width: 96,
                height: 96,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 24,
                background: "linear-gradient(135deg, #006dff, #00c8ff)",
                boxShadow: "0 0 44px rgba(0, 200, 255, 0.35)",
                fontSize: 58,
                fontWeight: 900,
                letterSpacing: -3,
              }}
            >
              K
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ fontSize: 54, letterSpacing: 8, lineHeight: 1 }}>{siteConfig.name.toUpperCase()}</strong>
              <span style={{ marginTop: 12, color: "#6ee7ff", fontSize: 24, letterSpacing: 18 }}>TECH</span>
            </div>
          </div>
          <h1 style={{ maxWidth: 830, margin: "76px 0 0", fontSize: 76, lineHeight: 0.96, letterSpacing: -2 }}>
            Tecnologia que transforma negócios.
          </h1>
          <p style={{ maxWidth: 850, margin: "28px 0 0", color: "#bfd2e8", fontSize: 30, lineHeight: 1.35 }}>
            Sites, sistemas, automações e produtos SaaS para empresas que querem trabalhar com mais controle.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 52,
              color: "#9cecff",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#00c8ff", boxShadow: "0 0 20px #00c8ff" }} />
            {siteConfig.domain}
          </div>
        </main>
      </div>
    ),
    size,
  );
}
