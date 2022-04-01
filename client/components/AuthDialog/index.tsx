import React from "react";
import {
  Button,
  Dialog,
  Divider,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { VKIcon } from "../../public/logos/VkontakteSVG";
import { EmailIcon } from "../../public/logos/EmailSVG";
import { AppleIcon } from "../../public/logos/AppleSVG";
import { FacebookIcon } from "../../public/logos/FacebookSVG";
import { GoogleIcon } from "../../public/logos/GoogleSVG";
import { TwitterIcon } from "../../public/logos/TwitterSVG";

import styles from "./AuthDialog.module.scss";

interface AuthDialogProps {
  visible: boolean;
  onClose: () => void;
}

interface State {
  password: string;
  showPassword: boolean;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({ onClose, visible }) => {
  const [formType, setFormType] = React.useState<"main" | "email">("main");

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  return (
    <Dialog open={visible} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <DialogContentText>
          <div className={styles.content}>
            <Typography className={styles.title}>{ formType === 'main' ? 'Вход в TJournal' : (
              <p onClick={() => setFormType('main')} className={ styles.backTitle }>
                <ArrowBackIcon />
                Войти через почту
              </p>
            )}
            </Typography>
            {formType === "main" && (
              <>
                <div>
                  <Button className="mb-10" variant="contained" fullWidth>
                    <VKIcon />
                    Вконтакте
                  </Button>
                  <Button className="mb-10" variant="contained" fullWidth>
                    <GoogleIcon />
                    Google
                  </Button>
                  <Button
                    onClick={() => setFormType("email")}
                    className="mb-10"
                    variant="contained"
                    fullWidth
                  >
                    <EmailIcon />
                    Via Email
                  </Button>
                </div>
                <div className={styles.minibuttons}>
                  <Button className="mb-15" variant="contained" fullWidth>
                    <FacebookIcon />
                  </Button>
                  <Button className="mb-15" variant="contained" fullWidth>
                    <AppleIcon />
                  </Button>
                  <Button className="mb-15" variant="contained" fullWidth>
                    <TwitterIcon />
                  </Button>
                </div>
              </>
            )}
            {formType === "email" && (
              <div>
                <form>
                  <TextField
                    className="mb-20"
                    size="small"
                    label="Эл. почта"
                    variant="outlined"
                    fullWidth
                    required
                  />

                  <TextField size="small" label="Пароль" variant="outlined" className="mb-20" fullWidth required />
                  
                  <Button color="primary" variant="contained">
                    Войти
                  </Button>
                </form>
              </div>
            )}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
