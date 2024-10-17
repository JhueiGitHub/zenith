import { db } from "@/lib/db";

export const createZenithFlow = async (profileId: string) => {
  const zenithTokens = {
    colors: {
      background: {
        primary: "#292929",
        secondary: "#010203",
      },
      border: "#292929",
      black: "#000000",
      glass: "rgba(0, 0, 0, 0.3)",
      white: "rgba(204, 204, 204, 0.69)",
      active: "#28C840",
      warning: "#FEBC2E",
      error: "#FF5F57",
      accent: {
        lilac: "#7B6CBD",
        teal: "#003431",
      },
      text: {
        primary: "#ABC4C3",
        secondary: "#748393",
      },
    },
    fonts: {
      primary: "Arial",
      secondary: "Inter",
    },
  };

  const osStream = await db.stream.create({
    data: {
      name: "OS",
      profileId: profileId,
    },
  });

  await db.flow.create({
    data: {
      name: "Zenith",
      tokens: zenithTokens,
      streamId: osStream.id,
    },
  });
};
