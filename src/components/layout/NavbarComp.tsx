// eslint-disable-next-line import/no-extraneous-dependencies
import liff from '@line/liff';

export function NavbarComp() {
  let isLoggedIn = false;
  try {
    isLoggedIn = liff.isLoggedIn();
  } catch (e) {
    console.error(e);
  }

  return (
    <nav className="title-bar !p-4">
      <div className="title-bar-text flex items-center gap-1">
        <img
          src="/src/assets/images/logos/logins.png"
          className="size-6 object-contain"
          alt="logo"
        />
        <p className="text-white flex">
          Yahoo！即時通
          {isLoggedIn ? ' (已登入)' : ' (未登入)'}
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
