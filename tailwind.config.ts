import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // base 360px (mobile first), sm 640, md 768, lg 1024, xl 1280
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    extend: {
      colors: {
        navy: { DEFAULT: "#0B2545", 700: "#13315C", 600: "#1B3D6B" },
        brand: { DEFAULT: "#1E7F5C", hover: "#176849" },
        gold: "#C9A227",
        offwhite: "#F5F3EE",
        ink: "#1F2937",
        muted: "#4A5568",
        line: "#E4E1D8",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "12px", btn: "10px" },
      maxWidth: { container: "1200px" },
      boxShadow: {
        header: "0 2px 12px rgba(11, 37, 69, 0.08)",
        card: "0 1px 2px rgba(11, 37, 69, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
