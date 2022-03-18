import React from 'react';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';

import { Comment } from '../Comment';
import styles from './PostComments.module.scss';

type TComment = {
  text: string;
  id: number;
  createdAt: string;
  user: {
    fullName: string;
    avatarUrl: string;
  }
}

interface PostCommentsProps {
  items: TComment[];
}

export const PostComments: React.FC<PostCommentsProps> = ({ items }) => {
  return (
    <Paper elevation={0} className="mt-40 p-30">
      <Typography variant="h6" className="mb-20">
        42 комментария
      </Typography>
      <Tabs className="mt-20" value={0} indicatorColor="primary" textColor="primary">
        <Tab label="Популярные" />
        <Tab label="По порядку" />
      </Tabs>
      <Divider />
      <div className="mb-20" />
      {
        items.map((obj) => <Comment key={obj.id} user={obj.user} text={obj.text} createdAt={obj.createdAt} />)
      }
    </Paper>
  );
};

export default PostComments;