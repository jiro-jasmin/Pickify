import styles from '@/styles/Audio.module.css';
import { FiPlay, FiPause, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState, useEffect, useRef, SyntheticEvent } from 'react';

type Song = {
    id: number;
    title: string;
    artist: string;
    file: string;
    image: string;
}

const Audio = (props: { songs: Song[], isPlaying: boolean, setIsPlaying: Function, trackPlaying: number, setTrackPlaying: Function }) => {

    const audioRef = useRef<HTMLAudioElement>(null);

    const [timeSongInfo, setTimeSongInfo] = useState<{ currentTime: number, duration: number }>({
        currentTime: 0,
        duration: 0
    });

    const handlePlay = (): void => {
        props.setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.play();
        }
    }

    const handlePause = (): void => {
        props.setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    const handlePreviousOrNext = (arg: string): void => {
        let thisTrackPlaying = getIdOfNextOrPreviousTrack(arg);
        props.setTrackPlaying(thisTrackPlaying);

    }

    const getIdOfNextOrPreviousTrack = (arg: string): number => {
        let thisTrackPlaying = props.trackPlaying;
        let numberOfTracks = props.songs.length;
        if (arg === 'previous') {
            thisTrackPlaying--;
            if (thisTrackPlaying < 0) {
                thisTrackPlaying = numberOfTracks - 1;
            }
        }
        if (arg === 'next') {
            thisTrackPlaying++;
            if (thisTrackPlaying >= numberOfTracks) {
                thisTrackPlaying = 0;
            }
        }
        return thisTrackPlaying;
    }

    useEffect(() => {
        if (props.isPlaying) {
            if (audioRef.current) {
                audioRef.current.play();
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        }

    }, [props.trackPlaying, props.isPlaying]);

    const handleTimeUpdate = (e: SyntheticEvent<EventTarget>): void => {
        const current = (e.target as HTMLMediaElement).currentTime;
        const duration = (e.target as HTMLMediaElement).duration;

        if (current === duration) {
            handlePreviousOrNext('next');
        } else {
            let timeSongInfo = {
                currentTime: current,
                duration: duration
            }
            setTimeSongInfo(timeSongInfo);
        }
    }

    const getTime = (time: number): string => {
        return (
            Math.floor(time / 60) + ':' + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const handleDragging = (e: SyntheticEvent<EventTarget>): void => {
        if (audioRef.current) {
            audioRef.current.currentTime = parseInt((e.target as HTMLInputElement).value);
        }
        setTimeSongInfo({...timeSongInfo, currentTime: parseInt((e.target as HTMLInputElement).value)})
    }

    return (
        <>
            <div className={styles.rangeInfo}>
                <p>{getTime(timeSongInfo.currentTime)}</p>
                <input
                    type="range"
                    className={styles.range}
                    min={0}
                    max={timeSongInfo.duration}
                    value={timeSongInfo.currentTime}
                    onChange={handleDragging}
                />
                <p>{getTime(timeSongInfo.duration)}</p>
            </div>
            <div className={styles.controls}>
                <audio
                    ref={audioRef}
                    src={props.songs[props.trackPlaying].file}
                    className={styles.controlsAudioPlayer}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate} // when page loads, need to know song duration
                    controls
                />
                <FiChevronLeft size={24} onClick={() => handlePreviousOrNext('previous')} className={styles.controlsLogo} title="Previous song" aria-label="Previous song" />
                {props.isPlaying
                    ?
                    <FiPause size={32} onClick={() => handlePause()} className={styles.controlsLogo} title="Pause" aria-label="Pause" />
                    :
                    <FiPlay size={32} onClick={() => handlePlay()} className={styles.controlsLogo} title="Play" aria-label="Play" />
                }
                <FiChevronRight size={24} onClick={() => handlePreviousOrNext('next')} className={styles.controlsLogo} title="Next song" aria-label="Next song" />
            </div>
        </>
    )
}

export default Audio;