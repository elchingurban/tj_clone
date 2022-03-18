import React from 'react';
import Link from 'next/link';
import { Paper, Typography } from '@material-ui/core';
import Image from 'next/image';

import styles from './Post.module.scss';
import PostActions from '../PostActions';

export const Post: React.FC = () => {
  return (
    <Paper elevation={0} className="p-20" classes={{ root: styles.paper }}>
      <Typography variant="h5" className={ styles.title }>
        <Link href='/news/mariuopol'>
          <a>
            Авиаудар по Мариуполю. Главное о последствиях и о позициях Украины и России
          </a>
        </Link>
      </Typography>
      <Typography className="mt-15 mb-15">
        Украинские власти сообщают о трёх погибших, среди которых — ребёнок. В
        России это отрицают.
      </Typography>
      <Image
        src="https://leonardo.osnova.io/e0e5aa68-935a-5aaf-803e-e628318f7c23/-/preview/1300/-/format/webp/"
        height={400}
        width={600}
      />
      <PostActions />
    </Paper>
  );
};