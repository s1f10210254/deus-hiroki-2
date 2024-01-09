import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { userAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { supabase } from 'src/utils/supabase';

export const AuthLoader = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session === null && user?.id !== null) {
        await apiClient.api.private.session.$delete().catch(returnNull);
        setUser(null);
      } else if (session !== null && user?.id !== session.user.id) {
        await apiClient.api.private.session
          .$post({ body: { jwt: session?.access_token } })
          .catch(returnNull);
        await apiClient.api.private.users._userId(session.user.id).$get()
          .catch(returnNull).then((res) => res && setUser(res));
      }
    });

    return () => subscription.unsubscribe();
  }, [user?.id, setUser]);

  return <></>;
};
