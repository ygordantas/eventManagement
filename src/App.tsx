import { useState } from "react";
import TextInput from "./components/TextInput/TextInput";
import SelectInput from "./components/SelectInput/SelectInput";
import Button from "./components/Button/Button";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

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

      <SelectInput
        id="event-type"
        label="Event Type"
        required
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        options={[
          { value: "open", label: "Open" },
          { value: "invite", label: "Invite Only" },
        ]}
      />
    </div>
  );
}

export default App;
