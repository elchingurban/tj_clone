import React from 'react';

import { 
  Button,
  IconButton, 
  Divider, 
  Paper, 
  TextField, 
  Typography, 
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@material-ui/core';
import { MainLayout } from '../../layouts/MainLayout';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//       flexWrap: 'wrap',
//     },
//     margin: {
//       margin: theme.spacing(1),
//     },
//     withoutLabel: {
//       marginTop: theme.spacing(3),
//     },
//     textField: {
//       width: '25ch',
//     },
//   }),
// );

interface State {
  password: string;
  showPassword: boolean;
}

export const Settings: React.FC = () => {

  // const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });
  const handleChange = (prop: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  // const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  // };

  return (
    <MainLayout hideComments contentFullWidth={false} >
      <Paper className="p-20" elevation={0}>
        <Typography variant="h6">Основные настройки</Typography>
        <Divider className="mt-20 mb-30" />
        <form>
          <TextField
            className="mb-20"
            size="small"
            label="Никнейм"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            className="mb-20"
            size="small"
            label="Эл. почта"
            variant="outlined"
            fullWidth
            required
          />

          {/* <TextField size="small" label="Пароль" variant="outlined" fullWidth required /> */}
          <FormControl size="small" className="mb-20" variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

          <Divider className="mt-30 mb-20" />
          <Button color="primary" variant="contained">
            Сохранить изменения
          </Button>
        </form>
      </Paper>
    </MainLayout>
  );
}

export default Settings;