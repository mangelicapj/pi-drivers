const expRegNombre=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const expRegApellidos=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const expRegURL = /^(http|https):\/\/[^ "]+$/;

const validate = (form) => {
  const errors ={}
  if (!form.name) errors.name ='el nombre del conductor es requerido';
  else if (!expRegNombre.test(form.name)) errors.name = "el nombre no es valido";
  if (!form.surname) errors.surname ='el apellido del conductor es requerido';
  else if (!expRegApellidos.test(form.surname)) errors.surname = 'el apellido del conductor no es valido';
  if (!form.description) errors.description = "La descripción es requerida";
  else if (form.description.length > 200)
    errors.description = "La descripción no puede tener más de 200 caracteres";

  if (!form.image) errors.image = "La URL de la imagen es requerida";
  else if (!expRegURL.test(form.image))
    errors.image = "La URL de la imagen no es válida";

  if (!form.nationality) errors.nationality = "La nacionalidad es requerida";

  if (!form.dob) errors.dob = "La fecha de nacimiento es requerida";

  if (form.teams.length === 0 && !form.customTeam)
    errors.teams = "Debe seleccionar al menos un equipo o agregar uno personalizado";

  return errors 
}
export default validate