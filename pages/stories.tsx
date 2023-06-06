
import React, { Suspense, useState, useEffect } from "react";
import MyStory from '@/components/my-story'
import LinkSVG from "@/assets/link.svg";
import styled from 'styled-components';
import axios from 'axios';
import { TbSend } from "react-icons/tb"
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";

import { isMobile } from 'react-device-detect';

import linkImage from '../assets/Subtract.png';
import UpLeft from '../assets/up-left.svg';
import { useAppDispatch } from "@/stores/hook";
import { setPause } from "@/components/my-story/slices/story.slice";
import { useJoinWaitList } from "@/services/api";
import { RegisterForm } from "@/components/RegisterForm";
import { Logo } from "@/components/logo";


var stories = [{}];


function App() {

  const [height, setHeight] = useState('100vh'); // default to vh
  useEffect(() => {
    if ('CSS' in window && CSS.supports('height', '100svh')) {
      setHeight('100svh'); // switch to svh if supported
    }

    const searchParams = new URLSearchParams(location.search);
    const storyId = searchParams.get('storyId');


    const getStories = async () => {
        try {
          var response = await axios.get(`${process.env.NEXT_PUBLIC_RENDER_ADDRESS}/stories`, {
            params: {
                storyId: storyId,
            }
          });
        console.log(response)
        } catch (error) {
          console.error('Error making stories call:', error);
        }
    };
    getStories()



  }, []);

  return (
    <div className="App" style={{ display: 'grid', justifyContent: 'center', alignItems: 'center', height }}>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <div className="stories">
        <Suspense>
          <MyStory
            height="100svh"
            width="100svw"
            keyboardNavigation
            defaultInterval={8000}
            stories={stories}
            onStoryEnd={(s: any, st: any) => { }}
            onAllStoriesEnd={(s: any, st: any) => { }}
            onStoryStart={(s: any, st: any) => { }}
            storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
          />
          <Logo />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
