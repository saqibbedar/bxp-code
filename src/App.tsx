import { BxpCode } from "./BxpCode"


const App = () => {
  return (
    <div>
      <BxpCode
        code={`<?php
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
    `}
        theme="dark"
        lang="php"
        fileName="file.php"
      />
    </div>
  );
}

export default App;
