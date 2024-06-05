import {
  Mukta,
  DM_Sans,
  Plus_Jakarta_Sans,
  Proza_Libre,
  Lato,
  Cinzel,
  Life_Savers,
  Oregano,
  Alice,
  Young_Serif,

  // primary font for Ecard
  Style_Script,
  Pinyon_Script,
  Parisienne,
  Euphoria_Script,
  Great_Vibes,
  Meow_Script,
  Crimson_Pro,
} from "next/font/google";

export const mukta = Mukta({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: "normal",
});

export const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  style: ["normal", "italic"],
});

export const jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const great_vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const pinyon_script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const young_serif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal"],
});

export const life_savers = Life_Savers({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["normal"],
});

export const oregano = Oregano({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const alice = Alice({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const crimson_pro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const proza_libre = Proza_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});

// Script fonts
export const euphoria_script = Euphoria_Script({
  subsets: ["latin"],
  weight: "400",
});

export const style_script = Style_Script({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export const meow_script = Meow_Script({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
