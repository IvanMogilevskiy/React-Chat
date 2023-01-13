import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth.jsx';
import loginLogo from '../images/login.jpeg';
import routes from './routes.js';

const LoginPage = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required(t('login.required')),
      password: yup.string().required(t('login.required')),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem(
          'username',
          JSON.stringify(response.data.username),
        );
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          toast.error(t('notifications.error'), {
            position: 'top-right',
          });
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginLogo}
                  className="rounded-circle"
                  alt={t('login.login')}
                />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('login.login')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Label htmlFor="username">
                    {t('login.username')}
                  </Form.Label>
                  <Form.Control
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    autoComplete="username"
                    required
                    placeholder={t('login.username')}
                    id="username"
                    isInvalid={authFailed}
                    ref={inputRef}
                    type="text"
                  />
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Label className="form-label" htmlFor="password">
                    {t('login.password')}
                  </Form.Label>
                  <Form.Control
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    autoComplete="current-password"
                    required
                    placeholder={t('login.password')}
                    type="password"
                    id="password"
                    isInvalid={authFailed}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t('login.wrongAuthData')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3" variant="primary">
                  {t('login.login')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.noAcc')}</span>
                <a href="/signup">{t('login.linkText')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
