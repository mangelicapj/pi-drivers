const expRegNombre=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const expRegApellidos=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const expRegURL = /^(http|https)?:\/\/\S+$/;

const validate = (form) => {
  const errors ={}
  if (!form.name) errors.name ='el nombre del conductor es requerido';
  else if (!expRegNombre.test(form.name)) errors.name = "el nombre no es valido";
  if (!form.surname) errors.surname ='el apellido del conductor es requerido';
  else if (!expRegApellidos.test(form.surname)) errors.surname = 'el apellido del conductor no es valido';
  if (!form.description) errors.description = "La descripción es requerida";
  else if (form.description.length > 200)
    errors.description = "La descripción no puede tener más de 200 caracteres";

  if (!form.image) { 
  form.image = 'https://static.vecteezy.com/system/resources/previews/004/595/959/non_2x/formula-one-driver-and-racing-car-with-halo-aka-head-guard-in-red-color-race-sport-competition-concept-cartoon-illustration-on-white-background-vector.jpg';
  } else if (!expRegURL.test(form.image)) {
  errors.image = 'La URL de la imagen no es válida';
  }

  if (!form.nationality) errors.nationality = "La nacionalidad es requerida";

  if (!form.dob) errors.dob = "La fecha de nacimiento es requerida";

  if (!form.teams || form.teams.length === 0) {
    errors.teams = 'Debe seleccionar al menos un equipo o agregar uno personalizado';
  } else if (form.teams.length > 5) {
    errors.teams = 'No puedes seleccionar más de 5 equipos';
  }
  
  if (!form.customTeam && form.teams.length === 0) {
    errors.teams = 'Selecciona al menos un equipo si no agregas uno personalizado';
  }

  

  return errors 
}
export default validate