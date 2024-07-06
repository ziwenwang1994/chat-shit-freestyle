'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { GlobalStore, AppStore } from '@/lib/store';
import { getCookie } from 'cookies-next';
import { setAuthorization } from '@/http/axios';
import useInit from '@/lib/hooks/useInit';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = GlobalStore();
    const token = getCookie("auth_token");
    if(token){
      setAuthorization(token);
    }
  }
  useInit(storeRef);
  return <Provider store={storeRef.current}>{children}</Provider>;
}