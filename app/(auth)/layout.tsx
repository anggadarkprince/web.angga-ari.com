import '../(site)/globals.css'

export const metadata = {
  title: 'Auth Page',
  description: 'Sign in to your account',
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
