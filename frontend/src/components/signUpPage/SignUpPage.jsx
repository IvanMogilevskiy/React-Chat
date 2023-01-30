import { useState, useRef, useEffect } from 'react';
import {
  Button, Card, Form, Container, Row, Col, FloatingLabel,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../authentication/useAuth.jsx';
import routes from '../../routes.js';
import apiPath from '../../apiPath.js';
import signUpLogo from '../../images/signUp.jpg';

const SignUpPage = () => {
  const [regFailed, setRegFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required('signup.required')
        .min(3, 'signup.usernameLength')
        .max(20, 'signup.userNameLength'),
      password: yup
        .string()
        .required('signup.required')
        .min(6, 'signup.minPasswordLength'),
      confirmPassword: yup
        .string()
        .required('signup.required')
        .oneOf([yup.ref('password')], 'signup.passwordsShouldMatch'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(apiPath.signUpPath(), values);
        setRegFailed(false);
        auth.logIn(response);
        const { from } = location.state || { from: { pathname: routes.mainPage } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setRegFailed(true);
          inputRef.current.focus();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signUpLogo}
                  className="rounded-circle"
                  alt={t('signup.registration')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.registration')}</h1>
                <FloatingLabel controlId="username" label={t('signup.username')} className="mb-3">
                  <Form.Control
                    placeholder={t('signup.userNameLength')}
                    name="username"
                    autoComplete="username"
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    ref={inputRef}
                    isInvalid={(formik.touched.username && !!formik.errors.username) || regFailed}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username ? t(formik.errors.username) : null}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="password" label={t('signup.password')} className="mb-3">
                  <Form.Control
                    placeholder={t('signup.minPasswordLength')}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={
                      (formik.touched.password && !!formik.errors.password)
                      || regFailed
                    }
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password ? t(formik.errors.password) : null}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="confirmPassword" label={t('signup.confirmPassword')} className="mb-4">
                  <Form.Control
                    placeholder={t('signup.passwordsShouldMatch')}
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={
                      (formik.touched.confirmPassword
                        && !!formik.errors.confirmPassword)
                      || regFailed
                    }
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword
                      ? t(formik.errors.confirmPassword)
                      : t('signup.alreadyExists')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button type="submit" className="w-100" variant="primary" disabled={formik.isSubmitting}>
                  {t('signup.toSignUp')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signup.alreadyRegistered')}</span>
                <a href={routes.loginPage}>{t('signup.linkText')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
