'use client';
import { BaseURL } from '@/apis/core';
import { useAppSelector } from '@/redux/store/hooks/store';
import React, { useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';

type Token = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  role: string;
  sub: string;
};
export default function SSEHandler() {
  const { accessToken } = useAppSelector((state) => state.user);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const decode: Token = jwtDecode(accessToken);
    const connectSSE = () => {
      const EventSourcePolyfill = (window as any).EventSourcePolyfill || EventSource;
      eventSourceRef.current = new EventSourcePolyfill(
        `${BaseURL}notification/emitter/${decode.id}`,
        {
          headers: {
            'Content-Type': 'text/event-stream',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      eventSourceRef.current!.onopen = () => {
        console.log('EventSource connection opened successfully.');
      };

      eventSourceRef.current!.onmessage = (event: MessageEvent) => {
        console.log(event);
        console.log(event.data);
      };
      eventSourceRef.current!.addEventListener('notification', (e: Event) => {
        console.log(e);
      });

      eventSourceRef.current!.onerror = (error: unknown) => {
        console.error('EventSource failed:', error);
        eventSourceRef.current!.close();
        setTimeout(() => {
          if (accessToken !== '') connectSSE();
        }, 5000);
      };
    };

    if (accessToken !== '') {
      connectSSE();
    }

    // 컴포넌트가 언마운트될 때 이벤트 소스 닫기
    return () => {
      eventSourceRef.current!.close();
    };
  }, [accessToken]);

  return <></>;
}