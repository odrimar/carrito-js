//1.Definir las variables o selectores 
const contenedorCarrito = document.querySelector ('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector ('#vaciar-carrito');
const carrito = document.querySelector ('#carrito')
const listaCursos = document.querySelector ('#lista-cursos');
let articulosCarrito = [];

//2.Definir los eventos o listeners
cargarEventListener();
function cargarEventListener (){

    //click al boton de agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
    // elimina un curso del carrito 
    carrito.addEventListener('click', eliminarCurso);
    //vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = [];
        vaciarCarrito();
    });

} 

//3.definir una estructura para guardar 
//4.definir funciones

function agregarCurso(e){
    e.preventDefault();
    //console.log('agregar Curso')
    //console.log(e.target.classList)
    if(e.target.classList.contains('agregar-carrito')){
        //console.log(e.target.parentElement.parentElement)
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }

}

function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        console.log(cursoId);

        const existe = articulosCarrito.some(cursos => cursos.id === cursoId);

        if(existe){
            //actualizar la cantidad
            const cursos = articulosCarrito.map(cursos =>{
                console.log(cursos.id)
                if(cursos.id === cursoId){
                    //primero verifico el id para
                    //asegurar que haya encontrado el producto a eliminar
                    if(cursos.cantidad > 1){
                        cursos.cantidad--;
                        return cursos;//actualizamos objeto curso
                    }else{
                        //caso base: cantidad - 1
                        articulosCarrito = articulosCarrito.filter(cursos => cursos.id !== cursoId)
                        return cursos;
                    }
                
                }
            })
        }

        carritoHTML();
    }

}


function leerDatosCurso(curso){
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1 
    }

    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;

            }
        })

        articulosCarrito = [...cursos]

     }else{
            articulosCarrito = [...articulosCarrito,infoCurso];
     }

   // console.log(articulosCarrito)
   carritoHTML();
}

function carritoHTML(){
    vaciarCarrito();
    articulosCarrito.forEach(cursos => {
        const row = document.createElement('tr'); 
        row.innerHTML = `
            <td>
                <img src="${cursos.imagen}" width=100>
            </td>

            <td>${cursos.titulo}</td>
            <td>${cursos.precio}</td>
            <td>${cursos.cantidad}</td>
            <td>
               <a href="#" class="borrar-curso" data-id="${cursos.id}">X</a>
            </td>

         
        `

        contenedorCarrito.appendChild(row);
        
          
            

        
        
    })

}


function vaciarCarrito(){
    //contenedorCarrito.innerHTML= '';
    while(contenedorCarrito.firstChild)
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

}



