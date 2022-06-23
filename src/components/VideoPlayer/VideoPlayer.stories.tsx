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

export const Default = (args: Props) => <VideoPlayer {...args} />;
Default.args = {
  src,
  poster,
  style: full,
  disableBackgroundCover: false,
  startTime: 20,
  captions
};

export const LoopingCoverVideo = (args: Props) => <VideoPlayer {...args} />;
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

export const BasicPlayer = (args: Props) => <VideoPlayer {...args} />;
BasicPlayer.args = {
  src,
  poster,
  style: regular
};
