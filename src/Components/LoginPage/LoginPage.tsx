import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import './loginPage.scss';
import useApi from '../../api/useApi';
import routes from '../../utils/routes';
import { setLocalStorageUserData } from '../../utils/useLocalStorage';
import { useAppDispatch } from '../../hooks/hooks';
import { setAuth } from '../../store/userSlice';

const showToastify = (status: string | null) => {
  switch (status) {
    case 'authorized':
      return;
    case 'notAuthorized':
      toast.error('Аккаунт не авторизован');
      return;
    case 'blocked':
      toast.error('Аккаунт забанен');
      return;
    case 'sleepMode':
      toast.error('Аккаунт ушел в спящий режим');
      return;
    case 'starting':
      toast.error('Аккаунт в процессе запуска (сервисный режим)');
      return;
    default:
      toast.error(`Неизвестное состояние аккаунта ${status}`);
  }
};

const LoginPage = () => {
  const { getAccountStatus } = useApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authFailed, setAuthFailed] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const signUpSchema = yup.object().shape({
    id: yup.string().required('Обязательное поле'),
    token: yup.string().required('Обязательное поле'),
  });
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      id: '',
      token: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (userData) => {
      try {
        const { id, token } = userData;
        setAuthFailed(false);
        const statusAcc = await getAccountStatus(id, token);
        showToastify(statusAcc);
        if (statusAcc === 'authorized') {
          setLocalStorageUserData(JSON.stringify(userData));
          dispatch(setAuth(userData));
          navigate(routes.defaultPath());
        }
      } catch (err: any) {
        setAuthFailed(true);
        toast.error(`${err.message}, проверьте ваши данные`);
      }
    },
  });

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  return (
    <div className="form-container">
      <h2>Авторизация</h2>
      <form className="form" onSubmit={formik.handleSubmit}>

        <label htmlFor="id">
          idInstance
          <br />
          <input
            type="text"
            name="id"
            id="id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            placeholder="Введите ваш idInstance"
            className={(formik.errors.id && formik.touched.id) || authFailed ? 'form__input-error' : ''}
            ref={inputEl}
            required
          />
          {(formik.errors.id && formik.touched.id) && <p className="form__error-text">{formik.errors.id}</p>}
        </label>
        <br />
        <label htmlFor="token">
          apiTokenInstance
          <br />
          <input
            type="text"
            name="token"
            id="token"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.token}
            placeholder="Введите ваш apiTokenInstance"
            className={(formik.errors.token && formik.touched.token) || authFailed ? 'form__input-error' : ''}
            required
          />
          {(formik.errors.token && formik.touched.token) && <p className="form__error-text">{formik.errors.token}</p>}
        </label>
        <br />
        <div className="form__button-wrap">
          <button
            type="submit"
            className="form__btn btn"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
