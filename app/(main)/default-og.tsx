import { ImageResponse } from "@vercel/og";
import { OpenGraphImageStar } from "components/OpenGraphImageStar";

const spaceTextFont = fetch(new URL("/assets/fonts/space-text-medium.woff", import.meta.url)).then(
  res => res.arrayBuffer(),
);

const madeDillanFont = fetch(new URL("/assets/fonts/made-dillan.woff", import.meta.url)).then(res =>
  res.arrayBuffer(),
);

export async function defaultOg(title?: string, description?: string) {
  const adjustedTitle = title ? title.slice(0, 100) : "Mohammad Atallah";

  const adjustedDescription = description
    ? description.slice(0, 100)
    : "I'm a frontend developer and aspiring software engineer";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#dcfce7",
          padding: "70px 96px",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <OpenGraphImageStar />
          {title != "Mohammad Atallah" && (
            <h3
              style={{
                fontFamily: "var(--font-space-text)",
                fontSize: "45px",
                fontWeight: "500",
                color: "#15803d",
                marginLeft: "24px",
              }}
            >
              Mohammad Atallah
            </h3>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <h1 style={{ fontFamily: "MADE Dillan", fontSize: "110px", lineHeight: 1.1 }}>
            {adjustedTitle}
          </h1>
          <h2 style={{ fontFamily: "Space Text", fontSize: "55px", lineHeight: 1.3 }}>
            {adjustedDescription}
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Space Text",
          data: await spaceTextFont,
          style: "normal",
        },
        {
          name: "MADE Dillan",
          data: await madeDillanFont,
          style: "normal",
        },
      ],
    },
  );
}
