export function NavbarComp() {
  return (
    <nav className="title-bar !p-4">
      <div className="title-bar-text flex items-center gap-1">
        <img
          src="/src/assets/images/logos/logins.png"
          className="size-6 object-contain"
          alt="logo"
        />
        <p className="text-white">Yahoo！即時通</p>
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
