import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import Song from '@/components/Song';
import dynamic from 'next/dynamic';
import { FiMusic } from 'react-icons/fi';
import { GoMarkGithub } from "react-icons/go";
// lazy loading as the data is get client-side
const Audio = dynamic(import('@/components/Audio'), {
  ssr: false
});

const SONGS: Song[] = [
  {
    id: 0,
    title: 'The Shuffle',
    artist: 'Danya Vodovoz',
    file: '/songs/Danya Vodovoz - The Shuffle.mp3',
    image: '/covers/0.jpg'
  },
  {
    id: 1,
    title: 'Birdseye Blues',
    artist: 'Chris Haugen',
    file: '/songs/Birdseye Blues - Chris Haugen.mp3',
    image: '/covers/1.jpg'
  },
  {
    id: 2,
    title: 'Depth Fuse',
    artist: 'French Fuse',
    file: '/songs/Depth Fuse - French Fuse.mp3',
    image: '/covers/2.jpg'
  },
  {
    id: 3,
    title: 'Duh Fuse',
    artist: 'French Fuse',
    file: '/songs/Duh Fuse - French Fuse.mp3',
    image: '/covers/3.jpg'
  }
];

export const getStaticProps: GetStaticProps = async () => {
  const allSongs: Song[] = SONGS;
  return {
    props: {
      songs: allSongs
    },
    // query every 3600s to be up to date, if songs in database would change
    revalidate: 3600
  }
};

const Home: NextPage<{ songs: Song[] }> = ({ songs }) => {

  const [trackPlaying, setTrackPlaying] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Pickify | Listen to your favorite music online </title>
        <meta name="description" content="Pickify is an online music player which allows you to search and play your favorite songs !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <FiMusic size={32} />
        <h1>Pickify</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.songPlaying}>
          <Song song={songs[trackPlaying]} isPlaying={isPlaying} />
        </div>
        <Audio songs={songs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} trackPlaying={trackPlaying} setTrackPlaying={setTrackPlaying} />
      </main>
      <a href="https://github.com/jiro-jasmin" target="_blank" className={styles.github}><GoMarkGithub size={20} /></a>
    </>
  )
};

export default Home;