import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';

export default function Home() {
  return (
    // hideMenu={true} hideComments={true} hideContent={true}
    <MainLayout>
      <Post />
      <Post />
      <Post />
      <Post />
    </MainLayout>
  );
}
