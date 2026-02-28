import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = Number(process.env.PORT) || 5000

async function main() {
    try {

        await prisma.$connect();
        
        app.listen(PORT,"0.0.0.0",()=>{
            console.log(`Serveris running http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("An error occurred:", error);
        await prisma.$disconnect()
    process.exit(1)
    }
}

main()