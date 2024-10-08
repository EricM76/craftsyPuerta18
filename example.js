const numeros = [3,6,8,1,2]

const productos = [
    {
        id : 3,
        name : "three"
    },
    {
        id : 1,
        name : "one"
    },
    {
        id : 2,
        name : "two"
    }
]

console.log(productos.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0 ));
