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
function agregarUsuario() {
    const nombre = document.getElementById("nombre").value.trim(); /*Obtiene el valor del campo de nombre, elimina los espacios en blanco al inicio y al final, y lo asigna a la variable nombre*/
    const edad = parseInt(document.getElementById("edad").value, 10); /*Obtiene el valor del campo de edad, lo convierte a un número entero y lo asigna a la variable edad*/
    const rol = document.getElementById("rol").value;  /*Obtiene el valor del campo de rol y lo asigna a la variable rol*/

    const formularioValido = validarFormulario(nombre, edad, rol); /*Llama a la función validarFormulario() con los valores de nombre, edad y rol, y asigna el resultado a la variable formularioValido*/
    if (!formularioValido) { /*if para verificar si la validación del formulario ha fallado, si formularioValido es false se muestra una alerta y se retorna para evitar que se agregue un usuario con datos no válidos*/
        return; /*Retorna para evitar que se agregue un usuario con datos no válidos, se utiliza para salir de la función si la validación ha fallado*/
    }
    const nuevoUsuario = { /*Crea un nuevo objeto usuario con las propiedades nombre, edad, rol y activo, y lo asigna a la variable nuevoUsuario*/
        nombre: nombre, /*Asigna el valor de la variable nombre a la propiedad nombre del nuevo usuario*/
        edad: edad, /*Asigna el valor de la variable edad a la propiedad edad del nuevo usuario*/
        rol: rol, /*Asigna el valor de la variable rol a la propiedad rol del nuevo usuario*/
        activo: true /*Asigna true a la propiedad activo del nuevo usuario*/
    };
    usuarios.push(nuevoUsuario); /*Agrega el nuevo usuario al array de usuarios*/
    limpiarFormulario(); /*Llama a la función limpiarFormulario() para limpiar los campos del formulario después de agregar un nuevo usuario*/
    mostrarUsuarios(usuarios); /*Llama a la función mostrarUsuarios() para actualizar la tabla de usuarios después de agregar un nuevo usuario*/
}

/* Funcion para limpiar los campos del formulario */
function limpiarFormulario() {
    document.getElementById("nombre").value = ""; /*Limpia el campo de nombre, asignando una cadena vacía al valor del campo*/
    document.getElementById("edad").value = ""; /*Limpia el campo de edad, asignando una cadena vacía al valor del campo*/
    document.getElementById("rol").value = ""; /*Limpia el campo de rol, asignando una cadena vacía al valor del campo*/
}

/* Funcion para mostrar los usuarios en la tabla */
function mostrarUsuarios(listaUsuarios) {
    const tabla = document.getElementById("tablaUsuarios"); /*Obtiene el elemento de la tabla con id "tablaUsuarios" y lo asigna a la variable tabla*/
    tabla.innerHTML = ""; /*Limpia el contenido de la tabla, asignando una cadena vacía al innerHTML de la tabla*/
    listaUsuarios.forEach((usuario, index) => { /*Recorre el array de usuarios utilizando forEach, para cada usuario se ejecuta la función que recibe el usuario y su índice como parámetros*/
        const fila = document.createElement("tr"); /*Crea un nuevo elemento de fila (tr) y lo asigna a la variable fila*/
        const estadoTexto = usuario.activo ? "Activo" : "Inactivo"; /*Determina el texto para el estado del usuario, si usuario.activo es true se asigna "Activo", de lo contrario se asigna "Inactivo", y se asigna a la variable estadoTexto*/
        const estadoClase = usuario.activo /*Determina la clase para el estado del usuario, si usuario.activo es true se asigna "text-success", de lo contrario se asigna "text-danger", y se asigna a la variable estadoClase*/
            ? "bg-success" /*Clase para estado activo, con fondo verde*/
            : "bg-danger"; /*Clase para estado inactivo, con fondo rojo*/

        /*Establecer el contenido HTML de la fila utilizando template literals, para mostrar los datos del usuario en las celdas de la tabla, incluyendo el número de fila (index + 1), nombre, edad, rol, estado con clase para estilo y botones de acciones para editar y eliminar al usuario*/
        fila.innerHTML = ` 
        <td>${index + 1}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.edad}</td>
        <td>${usuario.rol}</td>
        <td>
            <span class="badge ${estadoClase} badge-estado">
                ${estadoTexto}
            </span>
        </td>
        <td class="d-flex gap-2 flex-wrap">
            <button
                type="button"
                class="btn btn-warning btn-sm"
                onclick="cambiarEstado(${index})"
            >
                Cambiar Estado
            </button>
            <button
                type="button"
                class="btn btn-danger btn-sm"
                onclick="eliminarUsuario(${index})"
            >
                Eliminar
            </button>
        </td>
    `;
        tabla.appendChild(fila); /*Agrega la fila creada al cuerpo de la tabla, utilizando appendChild para insertar la fila en el DOM*/
    });

    actualizarContadores(); /*Llama a la función actualizarContadores() para actualizar los contadores de usuarios activos e inactivos después de mostrar los usuarios en la tabla*/
}

function cambiarEstado(indice) { /*Funcion para cambiar el estado de un usuario, recibe el índice del usuario como parámetro*/
    usuarios[indice].activo = !usuarios[indice].activo; /*Cambia el estado del usuario en el array de usuarios, utilizando el operador de negación para invertir el valor actual de activo*/
    filtrarUsuarios(); /*Llama a la función filtrarUsuarios() para actualizar la tabla de usuarios después de cambiar el estado de un usuario*/
}

function eliminarUsuario(indice) { /*Funcion para eliminar un usuario, recibe el índice del usuario como parámetro*/
    const confirmar = confirm( /*Muestra una ventana de confirmación para eliminar al usuario, utilizando la función confirm() que devuelve true si el usuario confirma la acción o false si cancela*/
        `Deseas eliminar a ${usuarios[indice].nombre}?` /*Mensaje de confirmación que incluye el nombre del usuario a eliminar, utilizando template literals para insertar el nombre en el mensaje*/
    );
    if (confirmar) { /*if para verificar si el usuario confirmó la eliminación, si confirmar es true se procede a eliminar al usuario del array de usuarios*/
        usuarios.splice(indice, 1); /*Elimina el usuario del array de usuarios utilizando el método splice()*/
        filtrarUsuarios(); /*Llama a la función filtrarUsuarios() para actualizar la tabla de usuarios después de eliminar un usuario*/
    }
}

function filtrarUsuarios() { /*Funcion para filtrar los usuarios según el rol seleccionado en el campo de selección, no recibe parámetros ya que obtiene el valor del filtro directamente del DOM*/
    const filtro = document.getElementById("filtro").value; /*Obtiene el valor del campo de selección para el filtro de usuarios, y lo asigna a la variable filtro*/
    let usuariosFiltrados = []; /*Crea un array vacío para almacenar los usuarios filtrados, y lo asigna a la variable usuariosFiltrados*/
    switch (filtro) { /*Switch para determinar el filtro seleccionado, dependiendo del valor de filtro se asigna el array de usuarios filtrados correspondiente a la variable usuariosFiltrados*/
        case "Administrador": /*Caso para el filtro de Administrador, si filtro es "Administrador" se asigna un array filtrado que incluye solo los usuarios con rol "Administrador"*/
            usuariosFiltrados = usuarios.filter(usuario => usuario.rol === "Administrador");
            break; /*Break para salir del switch después de asignar el array de usuarios filtrados para el caso de Administrador*/
        case "Usuario": /*Caso para el filtro de Usuario, si filtro es "Usuario" se asigna un array filtrado que incluye solo los usuarios con rol "Usuario"*/
            usuariosFiltrados = usuarios.filter(usuario => usuario.rol === "Usuario");
            break;
        default: /*Caso por defecto para el filtro de Todos, si filtro no coincide con ningún caso anterior se asigna el array completo de usuarios a la variable usuariosFiltrados*/
            usuariosFiltrados = usuarios; /*Asigna el array completo de usuarios a la variable usuariosFiltrados, para mostrar todos los usuarios sin filtrar*/
    }
    mostrarUsuarios(usuariosFiltrados); /*Llama a la función mostrarUsuarios() con el array de usuarios filtrados para actualizar la tabla de usuarios según el filtro seleccionado*/
}

function actualizarContadores() { /*Funcion para actualizar los contadores de usuarios activos e inactivos, no recibe parámetros ya que obtiene los datos directamente del array de usuarios*/
    const activos = usuarios.filter(usuario => usuario.activo).length; /*Cuenta el número de usuarios activos utilizando el método filter() para incluir solo los usuarios cuyo estado es activo, y obtiene la longitud del array resultante para asignarla a la variable activos*/
    const inactivos = usuarios.filter(usuario => !usuario.activo).length; /*Cuenta el número de usuarios inactivos utilizando el método filter() para incluir solo los usuarios cuyo estado es inactivo, y obtiene la longitud del array resultante para asignarla a la variable inactivos*/
    document.getElementById("cantidadActivos").textContent = activos; /*Actualiza el contenido del elemento con id "cantidadActivos" para mostrar el número de usuarios activos, asignando el valor de la variable activos al textContent del elemento*/
    document.getElementById("cantidadInactivos").textContent = inactivos; /*Actualiza el contenido del elemento con id "cantidadInactivos" para mostrar el número de usuarios inactivos, asignando el valor de la variable inactivos al textContent del elemento*/
}

function ordenarPorEdad() { /*Funcion para ordenar los usuarios por edad, no recibe parámetros ya que ordena el array de usuarios directamente*/
    usuarios.sort((a, b) => a.edad - b.edad); /*Ordena el array de usuarios utilizando el método sort(), comparando la propiedad edad de cada usuario para ordenar de menor a mayor*/
    filtrarUsuarios(); /*Llama a la función filtrarUsuarios() para actualizar la tabla de usuarios después de ordenar por edad, para mostrar los usuarios ordenados según el filtro seleccionado*/
}

mostrarUsuarios(usuarios); /*Llama a la función mostrarUsuarios() con el array de usuarios para mostrar la tabla de usuarios al cargar la página por primera vez, mostrando todos los usuarios sin filtrar*/

