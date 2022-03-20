import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import data from '../../data';

import styles from './SideComments.module.scss';
import clsx from 'clsx';
interface CommentItemProps {
  user: {
    fullName: string;
  };
  text: string;
  post: {
    title: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <img src="https://leonardo.osnova.io/598fc957-a3f6-598c-b6f9-a033c3941d12/-/scale_crop/64x64/-/format/webp/" />
        <a href="#">
          <b>{user.fullName}</b>
        </a>
      </div>
      <p className={styles.text}>{text}</p>
      <a href="#">
        <span className={styles.postTitle}>{post.title}</span>
      </a>
    </div>
  );
};

export const SideComments = () => {

  const [hideComments, setHideComments] = React.useState(false);

  const toggleVisible = () => {
    setHideComments(!hideComments);
  }

  return (
    <div className={clsx(styles.root, !hideComments && styles.rotated)}>
      <h3 onClick={ toggleVisible }>
        Комментарии <ArrowRightIcon />
      </h3>
      {hideComments && data.comments.popular.map((obj) => (
        <CommentItem key={obj.id} {...obj} />
      ))}
    </div>
  );
};