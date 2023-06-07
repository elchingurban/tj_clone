import { OutputData } from '@editorjs/editorjs';
import {AxiosInstance} from 'axios';

type CreatePostDto = {
  title: string;
  body: OutputData['blocks'];
}

export const PostApi = (instance: AxiosInstance) => ({
  async getPosts(): Promise<any> {
    const { data } = await instance.get('/posts');
    return data;
  },

  async createPost(dto: CreatePostDto): Promise<any> {
    const { data } = await instance.post('/posts', dto);
    return data;
  }
});

