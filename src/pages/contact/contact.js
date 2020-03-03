import React, { useState } from 'react';
import Slider from '../../components/slider';
import Accordion from '../../components/accordion';


const Contact = props => {
  const [open, setOpen] = useState(null);

  const accordionToggle = index => {
    setOpen(open === index ? null : index);
  };

  return (
    <div>
      <div>
        <h2> Slider</h2>
        {
          [{ name: 'Путин' }, { name: 'Трамп' }, { name: 'Обама' }].map((element, index) => {
            return (
              <Accordion
                key={element.name}
                data={element}
                index={index}
                isActive={index === open}
                click={accordionToggle}
              />
            );
          })
        }
        <Slider data={['Банан', 'Апельсин']} />
      </div>
    </div>
  );
};


export default Contact;
