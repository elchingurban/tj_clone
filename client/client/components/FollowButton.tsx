import React from 'react';
import { Button } from '@material-ui/core';
import {
  CheckOutlined as CheckIcon,
  AddOutlined as AddIcon
} from '@material-ui/icons';

export const FollowButton: React.FC = () => {
  const [followed, setFollowed] = React.useState(false);

  return (
    <Button
      onClick={() => setFollowed(!followed)}
      variant="contained"
      style={{ minWidth: 30, width: 35, height: 30 }}>
      {!followed ? <AddIcon /> : <CheckIcon style={{ fontSize: 20, color: '#2ea83a' }} />}
    </Button>
  );
};