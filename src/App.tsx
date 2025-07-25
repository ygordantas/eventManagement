import { useState } from "react";
import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
import Select from "./components/Select/Select";

function App() {
  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  return (
    <div>
      <Button disabled className="potato">
        Solid
      </Button>
      <Button
        disabled
        as="p"
        target="_blank"
        href="https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name"
        variant="outline"
      >
        Outline
      </Button>

      <hr />
      <Input required label="Enter username" />
      <Input type="number" label="Event date" />

      <hr />

      <Select
        label="Dress Code"
        required
        onChange={(e) => setSelectedOption(Number(e.target.value))}
        value={selectedOption}
        options={[
          {
            value: 1,
            label: "Casual",
          },
          {
            value: 2,
            label: "Formal",
          },
        ]}
      />
    </div>
  );
}

export default App;
