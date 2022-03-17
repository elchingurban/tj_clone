import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';

export default function Home() {
  return (
    <MainLayout hideMenu={true} hideComments={true} hideContent={true}>
      <Post />
      <Post />
      <Post />
      <Post />
    </MainLayout>
  );
}
