'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { GlobalStore, AppStore } from '@/lib/store';
import { getCookie } from 'cookies-next';
import { setAuthorization } from '@/http/axios';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = GlobalStore();
    const token = getCookie("auth_token");
    console.log(getCookie, token);
    if(token){
      console.log(token);
      setAuthorization(token);
    }
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}