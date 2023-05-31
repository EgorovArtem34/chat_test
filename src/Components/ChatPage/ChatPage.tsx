import Aside from "../Aside/Aside";
import { IoLogoSnapchat } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './chat.scss';
import { MdMessage } from 'react-icons/md';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useApi from "../../api/useApi";
// import 'react-toastify/dist/ReactToastify.css';
// import { useAppDispatch } from '../../hooks/hooks';
// import { setChatId } from '../../store/chatSlice';
// import './aside.scss';

type RequestBodyType = {
  chatId: string | null,
  message: string | null,
};

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const { sendMessage } = useApi();
  const { activeChatId } = useAppSelector((state) => state.chatSlice);
  const signUpSchema = yup.object().shape({
    message: yup.string().min(1, 'Не менее 1 символа').required('Обязательное поле')
  });
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      message: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (message) => {
      const requestBody: RequestBodyType = {
        chatId: activeChatId,
        message: message ? message.message : '',
      };
      sendMessage(requestBody);
      formik.resetForm();
    },
  });
  const inputClass = () => cn('chat__input', {
    'form__input-error': formik.errors.message && formik.touched.message,
  });
  return (
    <>
      <Aside />
      <div className="chat">{
        !activeChatId ? <IoLogoSnapchat className="chat__logo" /> :
          <>
            <div className="chat__contact contact">
              <div className="contact__avatar">
                <FaUserCircle className="contact__icon" />
              </div>
              <div className="contact__data">
                <span>{activeChatId.replace('@c.us', '')}</span>
              </div>
            </div>
            <div className="chat__messages">
              chat
            </div>
            <div className="chat__form-wrapper">
              <form className="chat__form form" onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  name="message"
                  onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  value={formik.values.message}
                  placeholder="Введите сообщение..."
                  className={inputClass()}
                  required
                />
                {formik.errors.message && formik.touched.message && <p className="form__error-text">{formik.errors.message}</p>}
                <div className="form__button-wrap">
                  <button
                    type="submit"
                    className="form__button-chat"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    <MdMessage className="menu__icon-btn" />
                  </button>
                </div>
              </form >
            </div>
          </>
      }</div>
    </>
  )
};
export default ChatPage;

