/* Array de usuarios con propiedades: nombre, edad, rol y activo */
let usuarios = [
    {
        nombre: "Lara Croft",
        edad: 30,
        rol: "Administrador",
        activo: true
    },
    {
        nombre: "Ajay Ghale",
        edad: 28,
        rol: "Administrador",
        activo: true
    },
    {
        nombre: "Pagan Min",
        edad: 35,
        rol: "Usuario",
        activo: false
    },
    {
        nombre: "Jonah Maiava",
        edad: 25,
        rol: "Usuario",
        activo: false
    },
    {
        nombre: "Samantha Nishimura",
        edad: 32,
        rol: "Usuario",
        activo: false
    }
];

/* Funcion para validar el formulario de agregar usuario */
function validarFormulario(nombre, edad, rol) {

    if (nombre === "" || edad === "" || rol === "") { /*if para validar que los campos de nombre, edad y rol no estén vacíos, si alguno está vacío se muestra una alerta y se retorna false para indicar que la validación ha fallado*/
        alert("Todos los campos son obligatorios!");  /*Alerta para informar al usuario que todos los campos son obligatorios, se muestra si alguno de los campos está vacío*/
        return false; /*Retorna false para indicar que la validación ha fallado, se utiliza para evitar que se agregue un usuario con campos vacíos*/
    }
    if (edad <= 0 || isNaN(edad)) { /*if para validar que el campo de edad sea un número positivo, si la edad es menor o igual a 0 o no es un número se muestra una alerta y se retorna false para indicar que la validación ha fallado*/
        alert("La edad debe ser un número mayor a 0!"); /*Alerta para informar al usuario que la edad debe ser un número positivo, se muestra si la edad es menor o igual a 0 o no es un número*/
        return false; /*Retorna false para indicar que la validación ha fallado, se utiliza para evitar que se agregue un usuario con una edad no válida*/
    }
    return true; /*Retorna true para indicar que la validación ha sido exitosa, se utiliza para permitir que se agregue un usuario si todos los campos son válidos*/
}

/* Funcion para agregar un nuevo usuario al array de usuarios */