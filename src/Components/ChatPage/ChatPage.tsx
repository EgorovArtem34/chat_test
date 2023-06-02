import { useEffect, useRef } from 'react';
import Aside from "../Aside/Aside";
import { IoLogoSnapchat } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import cn from 'classnames';
import { toast } from 'react-toastify';
import * as _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './chat.scss';
import { MdMessage } from 'react-icons/md';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useApi from "../../api/useApi";
import { setMessage } from "../../store/chatSlice";
import 'react-toastify/dist/ReactToastify.css';

const formatedMessage = (message: string) => (
  {
    from: 'you',
    text: message,
  }
)

const ChatPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { sendMessage, receiveNotification } = useApi();
  const { activeChatId, messages, chatIds } = useAppSelector((state) => state.chatSlice);
  const currentMessages = activeChatId ? messages[activeChatId] || [] : [];
  const { userData: { id, token } } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    inputRef?.current?.focus();
    const getNewMessages = async () => {
      try {

        if (id && token) {
          const response = await receiveNotification(id, token);
          if (!response) {
            return;
          }
          if (chatIds.includes(response.body.senderData.sender)) {
            const newMessage = {
              from: response?.body?.senderData?.sender,
              text: response?.body?.messageData?.textMessageData?.textMessage,
            }
            dispatch(setMessage(newMessage));
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (id && token) {
      const timer = setInterval(() => getNewMessages(), 7000);
      return () => clearInterval(timer);
    }
  }, [activeChatId])

  const signUpSchema = yup.object().shape({
    message: yup.string().min(1, 'Не менее 1 символа').required('Обязательное поле')
  });
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      message: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async ({ message }) => {
      try {
        if (activeChatId !== null && id !== null && token !== null) {
          await sendMessage(activeChatId, message, id, token);
          const formatMessage = formatedMessage(message);
          dispatch(setMessage(formatMessage));
          formik.resetForm();
        }
      } catch (err: any) {
        console.log('!!!!!!!!!!!!!', err);
        toast.error(err.message);
      }
    },
  });
  const inputClass = () => cn('chat__input', {
    'form__input-error': formik.errors.message && formik.touched.message,
  });
  const messageClass = (senderMessage: string) => cn('chat__message', {
    'chat__message-you': senderMessage === 'you',
    'chat__message-companion': senderMessage !== 'you',
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
              {currentMessages.length > 0 ? currentMessages.map((message) => (
                <div className={messageClass(message.from)} key={_.uniqueId()}>
                  <span>{message.text}</span>
                </div>
              )) : null}
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
                  ref={inputRef}
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

