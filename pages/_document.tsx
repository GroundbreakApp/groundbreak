import { useAppSelector } from '@/stores/hook'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
      </Head>
      <body
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
