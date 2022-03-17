import React from 'react';
import clsx from 'clsx';
import { LeftMenu } from '../components/LeftMenu';
import { SideComments } from '../components/SideComments';

interface MainLayoutProps {
  hideContent?: boolean;
  hideComments?: boolean;
  hideMenu?: boolean;
  contentFullWidth?: boolean;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  contentFullWidth,
  hideContent,
  hideMenu,
  hideComments,
  className,
}) => {
  return (
    <div className={clsx('wrapper', className)}>
      {!hideMenu && 
        <div className="leftSide">
          <LeftMenu />
        </div>
      }

      { !hideContent && 
        <div className={clsx('content', { 
          'content--full': contentFullWidth 
        })}>{children}</div>
      }

      {!hideComments && (
        <div className="rightSide">
          <SideComments />
        </div>
      )}
    </div>
  );
};