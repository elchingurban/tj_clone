import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import { Button, Input } from '@material-ui/core';
import styles from './WriteForm.module.scss';
import { Api } from '../../utils/api';

const Editor = dynamic(() => import('../Editor').then(m => m.Editor), { ssr: false });
interface WriteFormProps {
  data?: any;
}

export const WriteForm: React.FC<WriteFormProps> = () => {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([]);

  const onAddPost = async () => {
    try {
      setLoading(true);
      const obj = await Api().post.createPost({
        title: title,
        body: blocks,
      });
      console.log(obj);
    } catch (err) {
      console.warn('Create post ', err);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        classes={{ root: styles.titleField }} 
        placeholder='Заголовок'
      />
      <div className={ styles.editor }>
        <Editor onChange={(blockArray) => setBlocks(blockArray)}/>
      </div>
      <Button
        disabled={isLoading}
        onClick={onAddPost}
        variant="contained" 
        color="primary"
      >
        Post
      </Button>
    </div>
  )
}