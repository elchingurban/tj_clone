import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { PostActions } from '../PostActions';
import MessageIcon from '@material-ui/icons/TextsmsOutlined';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';

import styles from './FullPost.module.scss';

export const FullPost = () => {
  return (
    <Paper elevation={0} className={styles.paper}>
      <div className="container">
        <Typography variant="h4" className={styles.title}>
          Авиаудар по Мариуполю. Главное о последствиях и о позициях Украины и России
        </Typography>
        <div>
          <Typography>
          Украинские власти сообщают о трёх погибших, среди которых — ребёнок. В
        России это отрицают.
          </Typography>
          <Typography>
          В центре Мариуполя 9 марта разрушили здания роддома и детской больницы. Об этом сообщил глава Донецкой областной государственной администрации Павел Кириенко.
          </Typography>
          <Typography>Видео изнутри разрушенного роддома опубликовал в телеграм-канале президент Украины Владимир Зеленский. Человек за кадром говорит, что по зданию сработал российская авиация, и показывают разрушенные стены и следы крови на полу.</Typography>
          <Typography>
          Позже Зеленский выступил с заявлением, в котором обвинил в обстреле больницы российские войска. Такой же точки зрения придерживаются местные власти. Он сообщил о 17 раненных в результате удара и призвал НАТО «закрыть небо» над Украиной. По словам президента страны, под завалами всё ещё могут находиться люди. Кириенко заявил, что среди раненых — роженицы и дети.
          </Typography>
          <div style={{ width: 250, marginLeft: -14 }}>
            <PostActions />
          </div>
          <div className="d-flex justify-between align-center mt-30 mb-30">
            <div className={styles.userInfo}>
              <img
                src="https://leonardo.osnova.io/104b03b4-5173-fd9f-2af9-b458dddc4a23/-/scale_crop/108x108/-/format/webp/"
                alt="Avatar"
              />
              <b>Aue Danaaa</b>
              <span>+1685</span>
            </div>
            <div>
              <Button variant="contained" className="mr-15">
                <MessageIcon />
              </Button>
              <Button variant="contained">
                <UserAddIcon />
                <b className="ml-10">Подписаться</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};