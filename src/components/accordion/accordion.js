import React from 'react';
import Collapse from '@kunukn/react-collapse';
import './accordion.scss';

const Accordion = ({ data, index, isActive, click }) => {

  const handleToggle = () => click(index);

  return (
    <div>
      <button onClick={handleToggle}>Открыть</button>
      <Collapse isOpen={isActive}>
        <div>
          {data.name}
        </div>
      </Collapse>
    </div>
  );
};
export default Accordion;
