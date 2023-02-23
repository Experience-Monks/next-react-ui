import { KeyboardEvent, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
// @ts-ignore
import BackgroundVideo from 'react-background-video-player';
import classnames from 'classnames';
// @ts-ignore
import fullscreenHandler from 'fullscreen-handler';
import noop from 'no-op';

import styles from './VideoPlayer.module.scss';

import VideoControls from './VideoControls/VideoControls';

export type Captions = {
  kind: string;
  label: string;
  srclang: string;
  default: boolean;
  src: string;
};

export type Props = {
  className?: string;
  style?: object;
  src: string;
  preload?: string;
  playsInline?: boolean;
  crossOrigin?: string;
  poster?: string;
  loop?: boolean;
  muted?: boolean;
  captions?: Captions;
  autoPlay?: boolean;
  volume?: number;
  togglePlayOnClick: boolean;
  windowWidth: number;
  windowHeight: number;
  startTime: number;
  allowKeyboardControl: boolean;
  showControlsOnLoad: boolean;
  hasControls: boolean;
  autoPlayDelay: number;
  disableBackgroundCover: boolean;
  controlsTimeout: number;
  onEnd: Function;
};

const VideoPlayer = ({
  className,
  style,
  src,
  preload = 'auto',
  playsInline = true,
  crossOrigin = 'anonymous',
  poster,
  loop = false,
  muted = false,
  captions,
  autoPlay = false,
  volume = 1,
  togglePlayOnClick = true,
  windowWidth,
  windowHeight,
  startTime = 0,
  allowKeyboardControl = true,
  showControlsOnLoad = true,
  hasControls = true,
  autoPlayDelay = 0,
  disableBackgroundCover = true,
  controlsTimeout = 2.5,
  onEnd = noop
}: Props) => {
  const container = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fullScreen = useRef<any | null>();
  const captionsContainer = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLTrackElement | null>();
  const autoPlayTimeout = useRef<NodeJS.Timeout | null>();
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const VideoRef = useRef<any | null>();

  const [containerSize, setContainerSize] = useState({ width: windowWidth || 0, height: windowHeight || 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isShowingControls, setIsShowingControls] = useState(showControlsOnLoad);
  const [isShowingCaptions, setIsShowingCaptions] = useState(captions && captions.default);
  const [currentCaptions, setCurrentCaptions] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    fullScreen.current = fullscreenHandler(container.current, onEnterFullScreen, onExitFullScreen);

    if (hasControls) {
      showControlsOnLoad ? setHideControlsTimeout() : hideControls();
    }

    if (autoPlay) {
      autoPlayTimeout.current = setTimeout(() => {
        play();
        clearAutoPlayTimeout();
      }, autoPlayDelay * 1000);
    }

    return () => {
      pause();
      isFullScreen && fullScreen.current?.exit();

      clearAutoPlayTimeout();
      clearHideControlsTimeout();
      fullScreen.current?.destroy();
      trackRef.current && trackRef.current.removeEventListener('cuechange', onTrackChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setContainerSize({ width: windowWidth, height: windowHeight });
  }, [windowWidth, windowHeight]);

  useEffect(() => {
    if (isPlaying) {
      onPlay();
      hasControls && setHideControlsTimeout();
    } else {
      onPause();
      if (hasControls && progress) {
        clearHideControlsTimeout();
        showControls();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    setCaptions(captions!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captions]);

  function showControls() {
    !isShowingControls && setIsShowingControls(true);
  }

  function hideControls() {
    isShowingControls && setIsShowingControls(false);
  }

  function play() {
    !isPlaying && VideoRef.current?.play();
  }

  function pause() {
    isPlaying && VideoRef.current?.pause();
  }

  // function mute() {
  //   !isMuted && VideoRef.current?.mute();
  // }
  //
  // function unmute() {
  //   isMuted && VideoRef.current?.unmute();
  // }

  function togglePlay() {
    VideoRef.current?.togglePlay();
  }

  function toggleMute() {
    VideoRef.current?.toggleMute();
  }

  function toggleFullscreen() {
    isFullScreen ? fullScreen.current?.exit() : fullScreen.current?.enter();
  }

  function toggleCaptions() {
    setIsShowingCaptions(!isShowingCaptions);
  }

  function setCaptions(captions: Captions) {
    if (!captions) return;

    const video = VideoRef.current.video;
    if (video.contains(trackRef.current)) {
      video.removeChild(trackRef.current);
      trackRef.current?.removeEventListener('cuechange', onTrackChange);
    }

    const trackElement = document.createElement('track');
    trackElement.kind = captions.kind;
    trackElement.label = captions.label;
    trackElement.srclang = captions.srclang;
    trackElement.default = captions.default;
    trackElement.src = captions.src;
    trackElement.track.mode = 'hidden';

    trackRef.current = trackElement;
    video.appendChild(trackElement);
    video.textTracks[0].mode = 'hidden';
    trackElement.style.display = 'none';

    trackRef.current.addEventListener('cuechange', onTrackChange);
  }

  function clearHideControlsTimeout() {
    hideControlsTimeout.current && clearTimeout(hideControlsTimeout.current);
  }

  function clearAutoPlayTimeout() {
    autoPlayTimeout.current && clearTimeout(autoPlayTimeout.current);
  }

  function setHideControlsTimeout() {
    clearHideControlsTimeout();
    hideControlsTimeout.current = setTimeout(() => {
      isPlaying && hideControls();
    }, controlsTimeout * 1000);
  }

  function updateTime(currentTime: number) {
    VideoRef.current.setCurrentTime(Number(currentTime));
  }

  function onReady(duration: number) {
    if (captions) {
      captions.src && setCaptions(captions);
    }
    setDuration(duration);
  }

  function onTrackChange() {
    const trackList = VideoRef.current.video.textTracks;
    const textTracks = trackList && trackList.length > 0 ? trackList[0] : null;
    const cue =
      textTracks && textTracks.activeCues && textTracks.activeCues.length > 0 ? textTracks.activeCues[0] : null;
    const text = cue ? cue.text : '';
    setCurrentCaptions(text);
  }

  function onEnterFullScreen() {
    setIsFullScreen(true);
  }

  function onExitFullScreen() {
    setIsFullScreen(false);
  }

  function onPlay() {
    setIsPlaying(true);
  }

  function onPause() {
    setIsPlaying(false);
  }

  function onTimeUpdate(currentTime: number, progress: number, duration: number) {
    setCurrentTime(currentTime);
    setDuration(duration);
    setProgress(progress);
  }

  function onMute() {
    setIsMuted(true);
  }

  function onUnmute() {
    setIsMuted(false);
  }

  function onVideoEnd() {
    onEnd();
    isFullScreen && fullScreen.current.exit();
  }

  function onMouseMove() {
    if (hasControls) {
      showControls();
      isPlaying && setHideControlsTimeout();
    }
  }

  function onKeyPress(e: KeyboardEvent) {
    if (allowKeyboardControl) {
      const event = e.key;
      if (event === 'Spacebar' || event === ' ') {
        togglePlay();
      }
    }
  }

  function onControlsFocus() {
    if (hasControls) {
      showControls();
      clearHideControlsTimeout();
    }
  }

  function onControlsBlur() {
    if (hasControls) {
      clearHideControlsTimeout();
      isPlaying && setHideControlsTimeout();
    }
  }

  return (
    <div
      className={classnames(styles.VideoPlayer, className, {
        [styles.showControls]: isShowingControls,
        [styles.showCaptions]: isShowingCaptions
      })}
      style={style}
      ref={container}
      onMouseMove={onMouseMove}
    >
      <BackgroundVideo
        ref={VideoRef}
        src={src}
        containerWidth={containerSize.width}
        containerHeight={containerSize.height}
        autoPlay={false}
        poster={poster}
        muted={muted}
        loop={loop}
        disableBackgroundCover={disableBackgroundCover}
        preload={preload}
        playsInline={playsInline}
        volume={volume}
        startTime={startTime}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        onMute={onMute}
        onUnmute={onUnmute}
        onEnd={onVideoEnd}
        onClick={togglePlayOnClick ? togglePlay : () => {}}
        onKeyPress={onKeyPress}
        tabIndex={allowKeyboardControl ? 0 : null}
        extraVideoElementProps={{ crossOrigin }}
      />

      {captions && (
        <div className={styles.captionsContainer} ref={captionsContainer}>
          {currentCaptions && <p>{currentCaptions}</p>}
        </div>
      )}

      {hasControls && (
        <VideoControls
          className={styles.controls}
          captions={Boolean(captions)}
          currentTime={Number(currentTime)}
          isPlaying={isPlaying}
          isMuted={isMuted}
          isFullScreen={isFullScreen}
          isShowingCaptions={isShowingCaptions}
          duration={duration}
          onPlayToggle={togglePlay}
          onMuteToggle={toggleMute}
          onFullscreenToggle={toggleFullscreen}
          onCaptionsToggle={toggleCaptions}
          onTimeUpdate={updateTime}
          onFocus={onControlsFocus}
          onBlur={onControlsBlur}
        />
      )}
    </div>
  );
};

export default memo(VideoPlayer);
