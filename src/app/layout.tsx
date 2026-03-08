import "./globals.css"

export const metadata = {
  title: "Hurricane Beryl Tracker",
  description: "Interactive map tracking Hurricane Beryl",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}