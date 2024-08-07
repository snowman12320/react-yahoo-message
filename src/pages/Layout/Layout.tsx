import { Link, Outlet } from 'react-router-dom';

import { Nav } from '@components';

import whiteLogo from '@assets/images/logo_white.png';
import lineIcon from '@assets/icons/line-icon.svg';
import igIcon from '@assets/icons/ig-icon.svg';

function Layout() {
  return (
    <>
      <Nav />

      <main className="secondary-bg">
        <Outlet />
      </main>

      <footer className="secondary-bg">
        <div className="top">
          <div className="left">
            <Link className="logo" to="/"><img src={whiteLogo} /></Link>
            <ul className="third-party-links">
              <li>
                <Link to="#">
                  <img
                    src={lineIcon}
                    alt="享樂酒店的 line 官方連結"
                  />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img
                    src={igIcon}
                    alt="享樂酒店的 ig 官方連結"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <ul className="right">
            <li>
              <p className="title">TEL</p>
              <p className="body">+886-7-1234567</p>
            </li>
            <li>
              <p className="title">MAIL</p>
              <p className="body">elh&commat;hexschool.com</p>
            </li>
            <li>
              <p className="title">FAX</p>
              <p className="body">+886-7-1234567</p>
            </li>
            <li>
              <p className="title">WEB</p>
              <p className="body">www.elhhexschool.com.tw</p>
            </li>
          </ul>
        </div>
        <div className="bottom">
          <address className="body">806023 台灣高雄市新興區六角路123號</address>
          <p className="body">&copy; 享樂酒店 2023 All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Layout;
