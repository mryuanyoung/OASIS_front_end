import React from 'react';
import {Button} from 'antd';
import '@babel/plugin-transform-async-to-generator';

async function getCount(){
  const a = await new Promise(resolve => setTimeout(resolve, 1000, 'yy')).then(res => res);
  return a;
}

function App() {
  return (
    <div>
      <Button>antd</Button>
      {getCount() instanceof Promise?'true':'false'}
    </div>
  );
}

export default App;
