import { useState } from "react";
import Button from "./components/Button/Button";
import TextInput from "./components/Input/TextInput";

function App() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <Button
        onClick={() => {
          console.log("btn clicked");
        }}
      >
        Button
      </Button>

      <Button
        href="https://www.w3schools.com/html/html_form_input_types.asp"
        variant="outline"
        as="a"
      >
        Link
      </Button>

      <hr />
      <TextInput
        id="test"
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        label="test"
      />
    </div>
  );
}

export default App;
