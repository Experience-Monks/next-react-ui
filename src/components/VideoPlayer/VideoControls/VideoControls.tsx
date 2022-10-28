/* eslint-disable sonarjs/cognitive-complexity */
import { FocusEventHandler, memo, useMemo } from 'react';
import classnames from 'classnames';
import noop from 'no-op';

import styles from './VideoControls.module.scss';

import BaseButton from '../../BaseButton/BaseButton';
import VideoTimeline from '../VideoTimeline/VideoTimeline';
import CaptionsOffIcon from './assets/captions-off.svg';
import CaptionsOnIcon from './assets/captions-on.svg';
import EnterFullscreenIcon from './assets/enter-fullscreen.svg';
import ExitFullscreenIcon from './assets/exit-fullscreen.svg';
import MutedIcon from './assets/muted.svg';
import PauseIcon from './assets/pause.svg';
import PlayIcon from './assets/play.svg';
import UnmutedIcon from './assets/unmuted.svg';

type SVG = (props: React.SVGProps<SVGElement>) => React.ReactElement;

export type Props = {
  className?: string;
  duration: number;
  currentTime: number;
  onPlayToggle?: Function;
  isPlaying?: boolean;
  onTimeUpdate?: Function;
  captions?: boolean;
  isShowingCaptions?: boolean;
  onCaptionsToggle?: Function;
  isMuted?: boolean;
  onMuteToggle?: Function;
  isFullScreen?: boolean;
  onFullscreenToggle?: Function;
  navAriaLabel?: string;
  playIcon?: SVG;
  playLabel?: string;
  pauseIcon?: SVG;
  pauseLabel?: string;
  captionsOnIcon?: SVG;
  captionsHideLabel?: string;
  captionsOffIcon?: SVG;
  captionsShowLabel?: string;
  mutedIcon?: SVG;
  unmuteLabel?: string;
  unmutedIcon?: SVG;
  muteLabel?: string;
  exitFullscreenIcon?: SVG;
  exitFullscreenLabel?: string;
  enterFullscreenIcon?: SVG;
  enterFullscreenLabel?: string;
  onFocus: Function;
  onBlur: Function;
};

const VideoControls = ({
  className,
  duration,
  currentTime,
  onPlayToggle = noop,
  isPlaying,
  onTimeUpdate = noop,
  captions,
  isShowingCaptions,
  onCaptionsToggle = noop,
  isMuted,
  onMuteToggle = noop,
  isFullScreen,
  onFullscreenToggle = noop,
  navAriaLabel = 'Video Controls',
  playIcon = PlayIcon,
  playLabel = 'Play Video',
  pauseIcon = PauseIcon,
  pauseLabel = 'Pause Video',
  captionsOnIcon = CaptionsOnIcon,
  captionsHideLabel = 'Hide Captions',
  captionsOffIcon = CaptionsOffIcon,
  captionsShowLabel = 'Show Captions',
  mutedIcon = MutedIcon,
  unmuteLabel = 'Unmute Video',
  unmutedIcon = UnmutedIcon,
  muteLabel = 'Mute Video',
  exitFullscreenIcon = ExitFullscreenIcon,
  exitFullscreenLabel = 'Exit Fullscreen Mode',
  enterFullscreenIcon = EnterFullscreenIcon,
  enterFullscreenLabel = 'Enter Fullscreen Mode',
  onFocus = noop,
  onBlur = noop
}: Props) => {
  function formatTime(totalSeconds: number) {
    const totalSecondsFloat = totalSeconds;
    let minutes: string | number = Math.floor(totalSecondsFloat / 60);
    let seconds: string | number = Math.round(totalSecondsFloat - minutes * 60);

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  const isFullscreenAPISupported = useMemo(() => {
    return (
      // @ts-ignore
      document.body.requestFullScreen ||
      document.body.requestFullscreen ||
      // @ts-ignore
      document.body.mozRequestFullScreen ||
      // @ts-ignore
      document.body.webkitRequestFullscreen ||
      // @ts-ignore
      document.body.webkitEnterFullScreen ||
      // @ts-ignore
      document.body.msRequestFullscreen
    );
  }, []);

  return (
    <nav
      className={classnames(styles.VideoControls, className)}
      aria-label={navAriaLabel}
      onFocus={onFocus as FocusEventHandler}
      onBlur={onBlur as FocusEventHandler}
    >
      <BaseButton
        className={styles.button}
        aria-label={isPlaying ? pauseLabel : playLabel}
        title={isPlaying ? pauseLabel : playLabel}
        onClick={onPlayToggle}
      >
        {/* @ts-ignore */}
        <img src={isPlaying ? pauseIcon : playIcon} alt={isPlaying ? pauseLabel : playLabel} />
      </BaseButton>

      <VideoTimeline duration={duration} currentTime={Number(currentTime)} onTimeUpdate={onTimeUpdate} />

      <time className={styles.time}>{formatTime(Number(currentTime))}</time>

      {captions && (
        <BaseButton
          className={styles.button}
          aria-label={isShowingCaptions ? captionsHideLabel : captionsShowLabel}
          title={isShowingCaptions ? captionsHideLabel : captionsShowLabel}
          onClick={onCaptionsToggle}
        >
          <img
            // @ts-ignore
            src={isShowingCaptions ? captionsOnIcon : captionsOffIcon}
            alt={isShowingCaptions ? captionsHideLabel : captionsShowLabel}
          />
        </BaseButton>
      )}

      <BaseButton
        className={styles.button}
        aria-label={isMuted ? unmuteLabel : muteLabel}
        title={isMuted ? unmuteLabel : muteLabel}
        onClick={onMuteToggle}
      >
        {/* @ts-ignore */}
        <img src={isMuted ? mutedIcon : unmutedIcon} alt={isMuted ? unmuteLabel : muteLabel} />
      </BaseButton>

      {isFullscreenAPISupported && (
        <BaseButton
          className={styles.button}
          aria-label={isFullScreen ? exitFullscreenLabel : enterFullscreenLabel}
          title={isFullScreen ? exitFullscreenLabel : enterFullscreenLabel}
          onClick={onFullscreenToggle}
        >
          <img
            // @ts-ignore
            src={isFullScreen ? exitFullscreenIcon : enterFullscreenIcon}
            alt={isFullScreen ? exitFullscreenLabel : enterFullscreenLabel}
          />
        </BaseButton>
      )}
    </nav>
  );
};

export default memo(VideoControls);
