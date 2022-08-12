import { IUserRequest } from "./dtos/IncrementSalesDTO";
import { client } from "../../prisma/client";
import { AppError } from "../../errors/AppError";

class IncrementSalesUseCase {

    async execute({ user, name, marca, amount, spots }: IUserRequest) {

        //verificar se o User existe
        const userAlreadyExists = await client.user.findUnique({
            where: {
                user,
            }
        });
        if (!userAlreadyExists) {
            throw new AppError("User Not Registered!");
        }

        //Verifica se o produto ja foi vendido pelo usuario
        const productAlreadySales = await client.sale.findFirst({
            where: {
                name,
                marca,
                user: {
                    user
                }
            }
        });
        if (productAlreadySales) {
            //Produto Ja vendido pelo usuario
            const amountCurrent = productAlreadySales.amount;
            const amountNew = amountCurrent + amount;

            const increments = await client.sale.updateMany({
                where: {
                    name,
                    marca,
                    user: {
                        user
                    }
                },
                data: {
                    amount: amountNew,
                    spots
                }
            });

            // Atualizar a contagem de pontos do Pião depois da venda
            const salesall = await client.sale.findMany({
                where: {
                    user: {
                        user
                    }
                }
            });
            const dadosF = [];
            for (let element of salesall) {
                dadosF.push(element.amount * element.spots);
            }
            let pointsall = 0;
            for (let i = 0; i < dadosF.length; i++) {
                pointsall += dadosF[i]
            }

            const sumAll = await client.user.update({
                where: {
                    user
                },
                data: {
                    summ: pointsall
                }
            });

        } else {
            //Produto ainda não vendido pelo usuario
            if (name) {

                const insertProduct = await client.sale.create({
                    data: {
                        user: {
                            connect: {
                                user
                            }
                        },
                        name,
                        marca,
                        amount,
                        spots
                    }
                });

                // Atualizar a contagem de pontos do Pião depois da venda
                const salesall = await client.sale.findMany({
                    where: {
                        user: {
                            user
                        }
                    }
                });
                const dadosF = [];
                for (let element of salesall) {
                    dadosF.push(element.amount * element.spots);
                }
                let pointsall = 0;
                for (let i = 0; i < dadosF.length; i++) {
                    pointsall += dadosF[i]
                }

                const sumAll = await client.user.update({
                    where: {
                        user
                    },
                    data: {
                        summ: pointsall
                    }
                });

            } else {

                throw new AppError("Product Not Defined!");

            }

        }

    }

}

export { IncrementSalesUseCase };