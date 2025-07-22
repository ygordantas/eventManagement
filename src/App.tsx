import { useState } from "react";
import Input from "./components/Input/Input";
import SelectInput from "./components/SelectInput/SelectInput";
import Button from "./components/Button/Button";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div>
      <Button
        disabled
        variant="outline"
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
        disabled
      >
        Link
      </Button>

      <hr />
      <Input
        id="test"
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        label="test"
      />

      <Input disabled label="date" type="datetime-local" />

      <SelectInput
        id="event-type"
        label="Event Type"
        required
        disabled
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
