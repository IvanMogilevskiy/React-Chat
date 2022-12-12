import { Outlet } from 'react-router-dom';

const Root = () => (
  <html className="h-100" lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title />
      <script defer="defer" src="/static/js/main.33e319f5.js" />
      <link href="/static/css/main.7953e5a8.css" rel="stylesheet" />
    </head>
    <body className="h-100 bg-light">
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">
                  Hexlet Chat
                </a>
                <button type="button" className="btn btn-primary">
                  Выйти
                </button>
              </div>
            </nav>
          </div>
          <div className="Toastify" />
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </body>
  </html>
);

export default Root;
