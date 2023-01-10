import { useState, useRef, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth.jsx';
import routes from './routes.js';
import signUpLogo from '../images/signUp.jpg';

const SignUpPage = () => {
  const [regFailed, setRegFailed] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef();

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
        .required('Required')
        .min(3, 'minUesrnameLength')
        .max(20, 'maxUsernameLength'),
      password: yup.string().required('Required').min(6, 'minPasswordLength'),
      confirmPassword: yup
        .string()
        .required('Required')
        .oneOf([yup.ref('password')], 'mustMatchWithPassword'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signUpPath(), values);
        localStorage.setItem('user', JSON.stringify(response.data));
        setRegFailed(false);
        auth.logIn();
        /* eslint-disable-next-line */
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
        navigate('/');
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
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signUpLogo}
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <div className="form-floating mb-3">
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    ref={inputRef}
                    isInvalid={
                      /* eslint-disable-next-line */
                      (formik.touched.username && !!formik.errors.username) ||
                      regFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username ? formik.errors.username : null}
                  </Form.Control.Feedback>
                </div>
                <div className="form-floating mb-3">
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control
                    placeholder="Не менее 6 символов"
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={
                      /* eslint-disable-next-line */
                      (formik.touched.password && !!formik.errors.password) ||
                      regFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password ? formik.errors.password : null}
                  </Form.Control.Feedback>
                </div>
                <div className="form-floating mb-4">
                  <Form.Label htmlFor="confirmPassword">
                    Подтвердите пароль
                  </Form.Label>
                  <Form.Control
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isInvalid={
                      /* eslint-disable-next-line */
                      (formik.touched.confirmPassword &&
                        /* eslint-disable-next-line */
                        !!formik.errors.confirmPassword) ||
                      regFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : null}
                  </Form.Control.Feedback>
                </div>
                <Button type="submit" className="w-100" variant="primary">
                  Зарегистрироваться
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
