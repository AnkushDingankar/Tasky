fetch("https://jsonplaceholder.typicode.com/users")
.then((result)=>result.json())
.then((data)=>console.log(data))

console.log("===========================")

const getData = async()=> 
{
    var result=await fetch("https://jsonplaceholder.typicode.com/users");
    var data =await result.json();
    console.log(data);
};
getData();

