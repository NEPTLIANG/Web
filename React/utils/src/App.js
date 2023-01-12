import LazyImg from './utils/lazy-img/lazy-img.tsx';

import logo from './logo.svg';
import './App.css';

function App() {
  // const img = document.querySelector("header > img")
  // if (img) {
  //   img.onload = e => console.log(e);
  // }
  // console.log(logo);
  const imgStyle = {
    margin: '1000px auto'
  }

  return (
    <div className="App">
      <header className="App-header">

        <LazyImg lazySrc={logo} className="App-logo" alt="logo" style={imgStyle} />
        {/* <LazyImg lazySrc={logo} className="App-logo" alt="logo" /> */}
        <LazyImg
          // className="App-logo"
          lazySrc="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
          alt="jj"
          conf={{
            threshold: 1
          }}
          style={imgStyle}
        />

        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
