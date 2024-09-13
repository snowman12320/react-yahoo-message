import liff from '@line/liff';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import logo from '@/assets/images/logos/logins.png';
import { KEY_TOKEN, getFromStorage } from '@/api';
import { useCurrentUser } from '@/hooks';

export function NavbarComp() {
  const location = useLocation();
  const [displayText, setDisplayText] = useState('');
  const { getCurrentUser, getStatusText } = useCurrentUser();

  useEffect(() => {
    let isLoggedIn = false;
    let isLineLoggedIn = false;

    isLineLoggedIn = liff.isLoggedIn();
    isLoggedIn = Boolean(getFromStorage(KEY_TOKEN, 'SESSION'));

    if (isLineLoggedIn) {
      setDisplayText('- LINE 會員');
    } else if (isLoggedIn) {
      setDisplayText('- 一般會員');
    } else {
      setDisplayText('- 已登出');
    }
  }, [location.pathname]);

  const closeWindow = () => {
    liff.closeWindow();
  };

  return (
    <nav className="title-bar !p-4">
      <div className="title-bar-text  flex items-center gap-1">
        <img
          src={logo}
          className="size-6 object-contain"
          alt="logo"
        />
        <p className="flex text-white">
          Yahoo！即時通
          <span className="pl-2 text-white">{displayText}</span>
          <span className="pl-2 text-white">
            {getStatusText(getCurrentUser()?.onlineStatus)}
          </span>
        </p>
      </div>

      <div className="title-bar-controls">
        <button
          type="button"
          aria-label="Minimize"
        />
        <button
          type="button"
          aria-label="Restore"
        />
        <button
          type="button"
          aria-label="Close"
          onClick={closeWindow}
        />
      </div>
    </nav>
  );
}
