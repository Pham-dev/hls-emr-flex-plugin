import React from 'react';
import { PaneHeaderStyles } from './PaneHeader.Styles';

interface PaneHeaderProps {
  className?: string;
  text: string;
}

const PaneHeader = ({className = '', text}: PaneHeaderProps) => {
  return (
    <PaneHeaderStyles>
      <div className={'' + className}>
        {text}
      </div>
    </PaneHeaderStyles>
  );
}

export default PaneHeader;
