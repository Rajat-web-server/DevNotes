import prisma from "./lib/prisma";

async function main(){
 const users = await prisma.users.findMany();

 console.log("Database connected")
 console.log(users)
}
main()
.catch((error)=>{
    console.log("Database connection failed")
    console.log(error)
})
.finally(async ()=>{
    await prisma.$disconnect();
});