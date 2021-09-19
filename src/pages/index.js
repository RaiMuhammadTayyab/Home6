
import  React from "react"
import {useQuery,useMutation} from '@apollo/client';
import gql from 'graphql-tag'
const Person_LinkQuery=gql`
{
person_link {
  Link
  name
  title
}

}
`
const Person_Query=gql`
{
  person {
    name 
    title 
    Link
    id 

  }

}`

const Add_person=gql`
mutation addperson ($title:String!, $name:String!){
addperson(title:$title, name:$name){
name
title
id
Link
}

}
`

const Home = () => {
  let inputtitle
  let inputname
  const[addperson]=useMutation(Add_person)
  
  const submithandle= async()=>{
    addperson({
      variables:{
       title:inputtitle.value,
       name:inputname.value
      },
      refetchQueries:[{query:Person_Query},{query:Person_LinkQuery}],
  
    
      })    
  
  inputtitle.value= ""
  inputname.value= ""
    }

  const Persons=useQuery(Person_Query)
  const Personquery=useQuery(Person_LinkQuery)
  console.log(Persons.data)
  console.log(Personquery.data)
  const errors = Persons.error || Personquery.error;
  const loading = Persons.loading || Personquery.loading;
  
  if (loading) {
    return <p>loading...</p>;
  }
    if (errors){
      return  <h3 style={{ color: 'red' }}>errors</h3>
    }
    console.log(errors)

  return (
    <div> 
<h1>Personal Data base</h1>

<h2>Enter the title</h2>
<input type='text' placeholder="title" ref={node=>{inputtitle=node}}/>
<br/>
<h2> Enter the name</h2>
<input type="text" placeholder="name" ref={node=>{inputname=node}}/>
<br/>
<br/>
<button onClick={submithandle}> Enter please</button>
<br/>
<br/>

      <table border="2">
  <thead>
    <tr>
<th>NAME</th>
<th>TITLE</th>
<th>LINKS</th>
</tr>
  </thead>
  <tbody>
{Persons.data.person.map(d=>{
return <tr key={d.id}>
  
  <td> {d.name}</td>
  
  <td> {d.title}</td>
  <td> {d.Link}</td>

</tr>


})}
  </tbody>  
  
    <thead>
      <tr>
        <th>Link</th>
      </tr>
      <tbody>
        <tr>
          <td>{Personquery.data.person_link.Link}</td>
        </tr>
      </tbody>
    </thead>
    
    
    
    </table>                                                                                                                                                                                                                                                                                                                                                       

</div>

  )
}
     
  

export default Home
