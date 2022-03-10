import Image from 'next/image'
import Head from 'next/head';
import { Paper, Typography } from '@material-ui/core';

import { Header } from '../components/Header';
import { Post } from '../components/Post';
// import { LeftMenu } from '../components/LeftMenu';

export default function Home() {
  return (
    <div>
      <Head>
        <title>tjournal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"></link>
      </Head>
      <Header />
      <div>
        <div className='leftSide'></div>
        <div className='content'>
          <Post />
        </div>
        <div className='rightSide'></div>
      </div>
    </div>
  )
}
