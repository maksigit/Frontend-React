import React from 'react';
import { withTranslation } from 'react-i18next';

const Hello = ({t}) => {
  return (
    <div>
      {t('hello.label')}
      <div>{t('title')}</div>
    </div>
  );
};

export default withTranslation()(Hello);
