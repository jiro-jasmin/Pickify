import styles from '@/styles/Song.module.css';
import Image from 'next/image';

type Song = {
    id: number;
    title: string;
    artist: string;
    file: string;
    image: string;
}

const Song = (props: { song: Song, isPlaying: boolean }) => {
    return (
        <>
            <div>
                <Image className={props.isPlaying ? styles.turning : styles.notTurning} src={props.song.image} width={300} height={300} alt="album cover" />
            </div>
            <div className={styles.songInfo}>
                <h2>{props.song.artist}</h2>
                <h3 className={styles.songInfo__title}>{props.song.title}</h3>
            </div>
        </>
    )
}

export default Song;