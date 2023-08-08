import './globals.css'

export const metadata = {
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  }, 
};

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Tipminer: Backoffice</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
