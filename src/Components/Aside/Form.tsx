import { useFormik } from 'formik';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setChatId } from '../../store/chatSlice';
import './aside.scss';

const Form = () => {
  const dispatch = useAppDispatch();
  const { chatIds } = useAppSelector((state) => state.chatSlice);
  const signUpSchema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required('Обязательное поле')
      .notOneOf(chatIds, 'Такой номер уже добавлен в чат')
      .test('valid-number-length', 'Введите действительный номер телефона', (value) => {
        const onlyDigitsPhoneNumber = value.replace(/\D/g, '');
        return onlyDigitsPhoneNumber.length > 4;
      })
      .test('valid-number-match', 'Такой номер уже есть', (value) => {
        const currentId = value.replace(/\D/g, '').concat('@c.us');
        return !chatIds.includes(currentId);
      }),
  });
  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: signUpSchema,
    onSubmit: ({ phoneNumber }) => {
      const onlyDigitsPhoneNumber = phoneNumber.replace(/\D/g, '');
      dispatch(setChatId(`${onlyDigitsPhoneNumber}@c.us`));
      formik.resetForm();
    },
  });
  return (
    <form className="aside__form form" onSubmit={formik.handleSubmit}>

      <label htmlFor="phoneNumber">
        Введите номер телефона
        <br />
        <input
          type="tel"
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          placeholder="7922665532"
          className={formik.errors.phoneNumber && formik.touched.phoneNumber ? 'form__input-error' : ''}
          required
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber && <p className="form__error-text">{formik.errors.phoneNumber}</p>}
      </label>
      <div className="form__button-wrap">
        <button
          type="submit"
          className="form__btn btn"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          Создать чат
        </button>
      </div>
    </form >
  )
};
export default Form;
