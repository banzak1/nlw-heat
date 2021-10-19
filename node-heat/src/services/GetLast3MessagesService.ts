import prismaClient from "../prisma"



class GetLast3MessagesService {
    async execute() {
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc",
            },
            include: {
                user: true,
            }
        });

        // SELECT * FROM MESSAGES LIMIT ORDER BY CREATED AT DESC

        return messages;
    }
}

export { GetLast3MessagesService };