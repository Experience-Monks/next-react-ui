import { useLayoutEffect, useState } from 'react';

import VideoPlayer, { Props } from './VideoPlayer';

export default { title: 'components/VideoPlayer' };

const poster = 'https://i1.wp.com/thetalkinggeek.com/wp-content/uploads/2015/09/sintel1.png?fit=1920%2C817&ssl=1';
const src = 'http://iandevlin.github.io/mdn/video-player-with-captions/video/sintel-short.mp4';

const captions = {
  kind: 'captions',
  label: 'English',
  srclang: 'en',
  default: true, // hide by default
  src: 'http://iandevlin.github.io/mdn/video-player-with-captions/subtitles/vtt/sintel-en.vtt'
};
const full = { width: '100vw', height: '100vh' };
const regular = { width: '720px', height: '306px' };

function VideoTest(props: JSX.IntrinsicAttributes & Props) {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleResize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  return <VideoPlayer {...props} windowWidth={windowSize.width} windowHeight={windowSize.height} />;
}

export const Default = (args: Props) => <VideoTest {...args} />;
Default.args = {
  src,
  poster,
  style: full,
  disableBackgroundCover: false,
  startTime: 20,
  captions
};

export const LoopingCoverVideo = (args: Props) => <VideoTest {...args} />;
LoopingCoverVideo.args = {
  src,
  poster,
  style: full,
  autoPlay: true,
  loop: true,
  muted: true,
  hasControls: false,
  togglePlayOnClick: false,
  disableBackgroundCover: false,
  allowedKeyboardControl: false
};

export const BasicPlayer = (args: Props) => <VideoTest {...args} />;
BasicPlayer.args = {
  src,
  poster,
  style: regular
};
