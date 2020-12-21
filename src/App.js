import { Container } from 'react-bootstrap'
import { Trail, animated } from 'react-spring/renderprops'
import { Loader } from './components/Loader'
import { responseTracker } from './data'

function App() {
  return (
    <div className="app">
      <Container className="app-wrapper p-5 w-100 h-100">
        <h1 className="text-center">Animated Loader UI</h1>
        <div className="wrapper">
          <Trail
            items={responseTracker.questions}
            keys={(item) => item}
            delay={1000}
            from={{
              opacity: '0',
              transform: 'translate3d(0,40px,0)',
              marginTop: 50,
            }}
            to={{
              opacity: '1',
              marginTop: 0,
              transform: 'translate3d(0,0px,0)',
            }}
          >
            {(question, index) => (trailProps) => (
              <animated.div style={trailProps}>
                <Loader
                  index={index}
                  answer={responseTracker.answerDetail[question]}
                />
              </animated.div>
            )}
          </Trail>
        </div>
      </Container>
    </div>
  )
}

export default App
