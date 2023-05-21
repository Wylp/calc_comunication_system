import {
  Title,
  ApplicationBody,
  ApplicationHeader,
  SubTitle as Subtitle
} from './components.jsx';

import Application from './application';


const App = () => {
  return (
    <div className="App">
      <ApplicationHeader>
        <Title>Calculadora de Sistemas de Amplificação/Atenuação</Title>
        <Subtitle>
          <a 
            href='https://github.com/Wylp' 
            target='blank'
            style={{
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Desenvolvedor: Alexsander de Oliveira (Para mais informações, clique aqui)
          </a>
        </Subtitle>
      </ApplicationHeader>
      <ApplicationBody>
        <Application />
      </ApplicationBody>
    </div>
  );
}

export default App;
