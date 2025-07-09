import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MERN Stack Developer Portfolio | Full Stack Web Developer",
  description:
    "Professional MERN stack developer with expertise in React, Node.js, MongoDB, and Express.js. Currently working at sdb it with 10+ developers team. View my projects and experience.",
  keywords:
    "MERN developer, Full Stack Developer, React Developer, Node.js Developer, MongoDB, Express.js, JavaScript, TypeScript, Web Development, Portfolio",
  authors: [{ name: "MERN Developer" }],
  creator: "MERN Developer",
  publisher: "MERN Developer",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "MERN Stack Developer Portfolio",
    description:
      "Professional MERN stack developer portfolio showcasing projects and experience",
    siteName: "MERN Developer Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MERN Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MERN Stack Developer Portfolio",
    description:
      "Professional MERN stack developer portfolio showcasing projects and experience",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://yourportfolio.com",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "MERN Stack Developer",
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "sdb it",
              },
              url: "https://yourportfolio.com",
              sameAs: [
                "https://github.com/yourusername",
                "https://linkedin.com/in/yourusername",
              ],
              knowsAbout: [
                "React",
                "Node.js",
                "MongoDB",
                "Express.js",
                "JavaScript",
                "TypeScript",
              ],
              description:
                "Professional MERN stack developer with expertise in full-stack web development",
            }),
          }}
        />
      </head>
      <body className={` overflow-x-hidden ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
