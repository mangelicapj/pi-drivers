import validate from "./Validation";
import { useState, useEffect } from "react";
import styles from "./FormPage.module.css";
import { getTeams } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: [], 
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: "",
  });

  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams) || []; 

  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };

  const addCustomTeam = () => {
    const customTeam = form.customTeam.trim();

    if (customTeam) {
      const selectedTeams = [...form.teams, customTeam];
      setForm({ ...form, teams: selectedTeams, customTeam: "" });
    }
  };

  return (
    <div className={styles["form-page"]}>
      <form>
        <label> Name: </label>
        <input type="text" value={form.name} onChange={changeHandler} name="name" />
        {errors.name && <span>{errors.name}</span>}

        <label> Surname: </label>
        <input type="text" value={form.surname} onChange={changeHandler} name="surname" />
        {errors.surname && <span>{errors.surname}</span>}

        <label> Description: </label>
        <input type="text" value={form.description} onChange={changeHandler} name="description" />
        {errors.description && <span>{errors.description}</span>}

        <label> Image: </label>
        <input type="text" value={form.image} onChange={changeHandler} name="image" />
        {errors.image && <span>{errors.image}</span>}

        <label> Nationality: </label>
        <input type="text" value={form.nationality} onChange={changeHandler} name="nationality" />
        {errors.nationality && <span>{errors.nationality}</span>}

        <label> Date of Birth (yyyy-mm-dd): </label>
        <input type="text" value={form.dob} onChange={changeHandler} name="dob" />
        {errors.dob && <span>{errors.dob}</span>}

        <label> Teams: </label>
        <select
        multiple
        value={form.teams}
        onChange={(e) => {
          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
          setForm({ ...form, teams: selectedOptions });
        }}
        name="teams"
      >
        {teams.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

        <input
          type="text"
          value={form.customTeam}
          onChange={changeHandler}
          name="customTeam"
          placeholder="Agrega un equipo personalizado"
        />
        <button type="button" onClick={addCustomTeam}>
          Agregar equipo personalizado
        </button>

        {errors.teams && <span>{errors.teams}</span>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

