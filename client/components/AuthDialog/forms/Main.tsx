import React from "react";
import { Button } from "@material-ui/core";

import AppleIcon from "../../../public/logos/AppleSVG";
import EmailIcon from "../../../public/logos/EmailSVG";
import FacebookIcon from "../../../public/logos/FacebookSVG";
import GoogleIcon from "../../../public/logos/GoogleSVG";
import TwitterIcon from "../../../public/logos/TwitterSVG";
import VKIcon from "../../../public/logos/VkontakteSVG";

import styles from "../AuthDialog.module.scss";

interface MainProps {
  onOpenLogin: () => void;
}

export const Main: React.FC<MainProps> = ({ onOpenLogin }) => {
  return (
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
          onClick={onOpenLogin}
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
  );
};

export default Main;
