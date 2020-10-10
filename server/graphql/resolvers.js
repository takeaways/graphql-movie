const geonil = {
    id:1,
    name:'Geonil Jang',
    age:29,
    gender:'male'
}
const may ={
    id:2,
    name:'May',
    age:27,
    gender:'female'
}

const people = [geonil,may] 


const getById = ({id})=>people.find(person =>person.id === id)
const resolvers ={
    Query:{
        person: (_,args)=>getById(args),
        people:()=>people
    }
}


export default resolvers