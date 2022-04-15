import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Main from "./forms/Main";
import Login from "./forms/Login";
import Register from "./forms/Register";

import styles from "./AuthDialog.module.scss";
interface AuthDialogProps {
  visible: boolean;
  onClose: () => void;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = React.useState<"main" | "login" | "register">("main");

  return (
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            <Typography className={styles.title}>{ formType === 'main' ? 'Вход в TJournal' : (
              <p onClick={() => setFormType('main')} className={ styles.backTitle }>
                <ArrowBackIcon />
                К авторизации
              </p>
            )}
            </Typography>

            {formType === "main" && (
              <Main onOpenLogin={() => setFormType('login')} />
            )}
            {formType === "login" && (
              <Login onOpenRegister={() => setFormType('register')}/>
            )}
            {formType === 'register' && (
              <Register onOpenRegister={() => setFormType('register')} onOpenLogin={() => setFormType('login')} />
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
