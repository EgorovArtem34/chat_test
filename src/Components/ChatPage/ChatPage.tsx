import Aside from "../Aside/Aside";
import { useAppDispatch } from '../../hooks/hooks';
import './chat.scss';

const ChatPage = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Aside />
      <div className="chat">HELLO CHAT</div>
    </>
  )
};
export default ChatPage;

