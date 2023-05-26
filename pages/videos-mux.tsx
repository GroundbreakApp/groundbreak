// import MuxPlayer from "@mux/mux-player-react";
import MuxPlayer from '@mux/mux-player-react';
import Head from 'next/head';

export default function VideoPage() {
  const widgetsJSON = JSON.stringify(
    [
      {
        type: 'TEXT',
        label: `Hey, Michael, We're so excited to have`,
        spawnTime: 1000,
        duration: 4000,
        style: {
          position: 'absolute',
          left: '10%',
          top: '30%',
          PointerEvents: 'auto'
        }
      },
      {
        type: 'LINK',
        label: `Tap to move to google.com`,
        href: "https://www.google.com",
        spawnTime: 2000,
        duration: 4000,
        style: {
          position: 'absolute',
          left: '40%',
          top: '60%',
          color: '#FF00FF',
          PointerEvents: 'auto'
        }
      }
    ]
  );

  return <>
    <Head>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    </Head>
    <main className='flex flex-row justify-between items-center p-0 min-h-screen w-full bg-gradient-to-tl from-[#DDFE6B] to-[#FFF170] h-screen'>
      <MuxPlayer
        playbackId="0134PWuDt2kvXirzaeNtPRezs7t9Dp3LeFgxtvNbvzRo"
        style={{
          height: "100%"
        }}
        widgets={widgetsJSON}
        aspectRatio={9 / 16}
        themeProps={{
          control: "none"
        }}
      />
    </main>
  </>
}