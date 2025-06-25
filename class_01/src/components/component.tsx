import { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Select from "react-select";
import type { SingleValue, GroupBase, StylesConfig } from "react-select";

type OptionType = { value: number; label: string };

const MyComponent = () => {
  const [texto, setTexto] = useState("Hola Mundo");
  const [texto2, setTexto2] = useState('');
  const [rbGenero, setRbgenero] = useState("Femenino");
  const [texto3, setTexto3] = useState(rbGenero);
  const [chkOpciones, setChkopciones] = useState<string[]>(["Ensalada"]);
  const [texto4, setTexto4] = useState<string | null>(null);

  const buttonClick = () => setTexto2(texto);

  const seleccionado = (val: string) => {
    setRbgenero(val);
    setTexto3(val);
  };

  const multiOpcion = (val: string[]) => setChkopciones(val);

  const dataOptions: OptionType[] = [
    { value: 1, label: "Opción 1" },
    { value: 2, label: "Opción 2" },
    { value: 3, label: "Opción 3" },
    { value: 4, label: "Opción 4" },
    { value: 5, label: "Opción 5" },
  ];

  const listado = (val: SingleValue<OptionType>) => {
    if (val) setTexto4(val.label);
  };

  const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (provided) => ({
      ...provided,
      alignItems: "baseline",
      backgroundColor: "white",
      color: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "lightblue" : "white",
      "&:hover": {
        backgroundColor: "lightblue",
        color: "black",
      },
    }),
  };

  return (
    <div>
      <h5>Mi primer Componente</h5>
      <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
      <button onClick={buttonClick}>Actualizar</button>
      <p>{texto}</p>
      <p>{texto2}</p>

      <br />
      <h5>Uso de Radio Buttons</h5>
      <ToggleButtonGroup type="radio" name="Oneoption" defaultValue={"Femenino"} onChange={seleccionado}>
        <ToggleButton id="tbrFem" value={"Femenino"} variant="outline-warning">Femenino</ToggleButton>
        <ToggleButton id="tbrMas" value={"Masculino"} variant="outline-warning">Masculino</ToggleButton>
        <ToggleButton id="tbrOtr" value={"Otro"} variant="outline-warning">Otro</ToggleButton>
      </ToggleButtonGroup>
      <p>{texto3}</p>

      <br />
      <h5>Uso de CheckBoxes</h5>
      <ToggleButtonGroup type="checkbox" name="Multipleoptions" defaultValue={["Ensalada"]} onChange={multiOpcion}>
        <ToggleButton id="chkOpc1" value={"Ensalada"} variant="outline-success">Ensalada</ToggleButton>
        <ToggleButton id="chkOpc2" value={"Pure Nuestra Tierra"} variant="outline-success">Pure Nuestra Tierra</ToggleButton>
        <ToggleButton id="chkOpc3" value={"Vegetales al vapor"} variant="outline-success">Vegetales al vapor</ToggleButton>
        <ToggleButton id="chkOpc4" value={"Vegetales salteados"} variant="outline-success">Vegetales salteados</ToggleButton>
      </ToggleButtonGroup>
      <ol>
        {chkOpciones.map((valor, index) => (
          <li key={index}>{valor}</li>
        ))}
      </ol>

      <br />
      <h5>Uso de Comboboxes (Select)</h5>
      <Select
        options={dataOptions}
        styles={customStyles}
        onChange={listado}
        placeholder="Seleccione una opción"
      />
      <p>{texto4}</p>
    </div>
  );
};

export default MyComponent;
