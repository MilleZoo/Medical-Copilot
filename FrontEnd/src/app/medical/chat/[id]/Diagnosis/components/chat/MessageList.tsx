import Message from './Message';
import styles from './MessageList.module.scss';
import { MessageType } from '../../Chat';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { fetchMessages } from '@/apis/message';

type Props = {
  messagelist: MessageType[];
  setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
  selectReport: (reportId: string) => void;
  pid: string;
};
export default function MessageList({ messagelist, setMessagelist, selectReport, pid }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(8);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    const getPatient = async () => {
      try {
        const response = await fetchMessages(page, size, pid);
        console.log(response);
        if (response.content === undefined) {
          new Error('Response 데이터가 이상합니다');
          return;
        }
        setMessagelist((prev) => [...prev, ...response.content[0].chatList]);
      } catch (err: unknown) {
        console.log(err);
      }
    };
    getPatient();
  }, [page, size, pid, setMessagelist]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div
      ref={scrollRef}
      className={styles.msgList}
    >
      {messagelist.map((message, index) => (
        <Message
          key={index}
          sender={message.question ? 'user' : 'bot'}
          message={message.comment}
          data={message}
          selectReport={selectReport}
        />
      ))}
      <div
        className="w-4 h-10 border"
        ref={loader}
      ></div>
    </div>
  );
}