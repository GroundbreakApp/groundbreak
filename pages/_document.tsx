import { useAppSelector } from '@/stores/hook'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"></meta>
        <meta property="og:image:secure_url" content="https://groundbreak-qa.vercel.app/images/GB-Newsletter.gif" />
        <meta property="og:image:type" content="image/gif" />
        <meta property="og:image:width" content="270" />
        <meta property="og:image:height" content="480" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.1.4/tailwind.min.css" rel='stylesheet'></link>
      </Head>
      <body
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
