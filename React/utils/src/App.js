import TimeLineItem from './utils/view-components/time-line/index.tsx';
// import LazyImg from './utils/lazy-img/lazy-img.tsx';

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div style={{ padding: '4rem' }}>
          <TimeLineItem 
            isStart
            title="test"
            style={{
              background: 'linear-gradient(-60deg, #1f001f, #3f001f)',
              borderRadius: '1rem',
              padding: '0 1rem'
            }}
          >
            <div style={{ color: '#3f3f3f', backgroundColor: '#fff', marginRight: '1rem', padding: '0.001rem 2rem', borderRadius: '1rem' }}>
              <h1>Child</h1>
              <p>Test test test test test test test test test test test test test test test test test test test test test test test test test test</p>
            </div>
          </TimeLineItem>
          <TimeLineItem 
            title="test2"
            style={{ padding: '0 1rem' }}
          />
          <TimeLineItem isEnding style={{ padding: '0 1rem' }} />
        </div>

        {/* lazy-img */}
        {/* <LazyImg lazySrc={logo} className="App-logo" alt="logo" style={{
              margin: '1000px auto'
            }} />
        <LazyImg
          // className="App-logo"
          lazySrc="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
          alt="jj"
          conf={{
            threshold: 1
          }}
          style={imgStyle}
        /> */}

        {/* Default */}
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
