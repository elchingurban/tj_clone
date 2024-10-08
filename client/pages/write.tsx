import React from 'react';
import { NextPage } from 'next'
import { TextField } from '@material-ui/core';
import { MainLayout } from '../layouts/MainLayout';
import { WriteForm } from '../components/WriteForm';

const WritePage: NextPage = () => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm />
    </MainLayout>

  );
};

export default WritePage;