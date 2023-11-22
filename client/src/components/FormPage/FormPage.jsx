import validate from "./Validation";
import { useState, useEffect } from "react";
import styles from "./FormPage.module.css";
import { getTeams, postDriver } from "../../redux/actions.js";
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
    customTeam: "",
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
    let value = event.target.value;

    if (event.target.type === 'select-multiple') {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      value = selectedOptions;
    }

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
 

  const submitHandler = async () => {
    const formErrors = validate(form);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0){
      event.preventDefault(); 
          
    }else if (Object.keys(formErrors).length === 0) {
      try {
        await dispatch(postDriver(form));
      } catch (error) {
        console.error("Error al enviar el formulario:", error.data);
      }
    }
  };

  return (
    <div className={styles["form-page"]}>
    <form onSubmit={submitHandler}> 
        <label > Name: </label>
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

        <label> Select Teams: </label>
        <select
          multiple
          value={form.teams}
          onChange={changeHandler}
          name="teams"
        >
          {teams.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <label> Custom Teams: </label>
      <div className={styles["custom-teams"]}>
        {form.teams.map((team, index) => (
          <span key={index}>{team}{index < form.teams.length - 1 ? ', ' : ''}</span>
        ))}
      </div>

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

        <button className={styles["button"]} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;