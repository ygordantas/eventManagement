import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function App() {
  return (
    <div>
      <Button disabled className="potato">
        Solid
      </Button>
      <Button
        disabled
        as="a"
        target="_blank"
        href="https://stackoverflow.com/questions/33949469/using-css-modules-how-do-i-define-more-than-one-style-name"
        variant="outline"
      >
        Outline
      </Button>

      <hr />
      <Input style={{ margin: "10px" }} />
    </div>
  );
}

export default App;
