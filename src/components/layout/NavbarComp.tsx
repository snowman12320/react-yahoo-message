// eslint-disable-next-line import/no-extraneous-dependencies
import liff from '@line/liff';

import logo from '@/assets/images/logos/logins.png';
import { KEY_TOKEN, getFromStorage } from '@/api';

export function NavbarComp() {
  let isLoggedIn = false;
  let isLineLoggedIn = false;
  let displayText = '';

  isLineLoggedIn = liff.isLoggedIn();
  isLoggedIn = Boolean(getFromStorage(KEY_TOKEN, 'SESSION'));

  if (isLineLoggedIn) {
    displayText = ' (LINE 會員)';
  } else if (isLoggedIn) {
    displayText = '(一般會員)';
  } else {
    displayText = '(未登入)';
  }

  return (
    <nav className="title-bar !p-4">
      <div className="title-bar-text flex items-center gap-1">
        <img
          src={logo}
          className="size-6 object-contain"
          alt="logo"
        />
        <p className="text-white flex">
          Yahoo！即時通
          <span className="text-white pl-2">{displayText}</span>
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
        />
      </div>
    </nav>
  );
}
