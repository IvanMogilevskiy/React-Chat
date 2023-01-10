import { useTranslation } from 'react-i18next';
import errorLogo from '../images/error.svg';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img
        alt="{t('errorPage.wrongPage')}"
        className="img-fluid h-25"
        src={errorLogo}
      />
      <h1 className="h4 text-muted">{t('errorPage.wrongPage')}</h1>
      <p className="text-muted">
        {t('errorPage.goBack')}
        <a href="/">{t('errorPage.linkText')}</a>
      </p>
    </div>
  );
};

export default ErrorPage;
