import { IUserRequest } from "./dtos/CreateSalesDTO";
import { client } from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import dayjs from "dayjs";

import Api from "../../services/Axios";




class CreateSalesUseCase {

    async execute({ user, name, marca, amount }: IUserRequest) {



        function getDataOne(rout: string, datan: string, err: string) {
            return Api.get(`${rout}`, {
                data: {
                    user: `${datan}`
                }
            }).catch(() => { throw new AppError(`${err}`) });
        }
        function getDataTwo(rout: string, datanone: string, datantwo: string, err: string) {
            return Api.get(`${rout}`, {
                data: {
                    name: `${datanone}`,
                    marca: `${datantwo}`
                }
            }).catch(() => { throw new AppError(`${err}`) });
        }


        /*
        function retProduct(rout: string, sis0: string, sis1: string, sis2: number, err: string) {
            return Api.post(`${rout}`, {
                data: {
                    name: `${sis0}`,
                    marca: `${sis1}`,
                    amount: sis2
                }
            }).catch(() => { throw new AppError(`${err}`) });
        }
        function postUserSales(rout: string, datan: string, datanone: string, datantwo: string, datantree: string, err: string) {
            return Api.post(`${rout}`, { data: { user: `${datan}`, name: `${datanone}`, amount: `${datantwo}`, spots: `${datantree}` } }).catch(() => { throw new AppError(`${err}`) });
        } */

        // Area de DEsenvolvimento------------------------

        // Validadno o Usuario-----------------------------

        const useraq = await getDataOne("users/pharm/consult", `${user}`, "User does not exist!");
        const useraqdata = useraq.data;

        // Validadno o Produto-----------------------------

        const prodctaq = await getDataTwo("products/pharm/consult", `${name}`, `${marca}`, "Product not registered or out of stock!");
        const prodctaqdata = prodctaq.data;

        // Realizando a Venda---------------------

        /*
        // Retirando o Produto do estoque
        const value = amount;
        const alterprod = await retProduct("products/pharm/alter", `${name}`, `${marca}`, value, "Product Output 01 Problems!");
        const alterone = alterprod.data;
        console.log(alterone);
        // Adicionando a venda ao usuario
        const spotsProduct = prodctaqdata.spots;
        console.log(spotsProduct);
        const alterproductuser = await postUserSales("users/pharm/products", `${user}`, `${name}`, `${amount}`, `${spotsProduct}`, "Product Output User Problems!");
        */



        // Retirando o Produto do estoque
        const alterfim = Api.post("products/pharm/alter", { name, marca, amount }).catch(() => { throw new AppError("Product Output 01 Problems!") });



        // Adicionando a venda ao usuario

        const spots: number = prodctaqdata.spots;

        const alterfimprod = Api.post("users/pharm/products", { user, name, marca, amount, spots }).catch(() => { throw new AppError("Product Output 02 Problems!") });
        const alterfimproductdata = (await alterfimprod).data;



        var localizedFormat = require('dayjs/plugin/localizedFormat');
        dayjs.extend(localizedFormat);
        const daynow = dayjs().format('L').toString();



        // Guardando a venda no Banco de Dados


        const buscaruser = await client.request.findUnique({
            where: {
                datenow: daynow
            }
        });
        if (!buscaruser) {
            const createSales = await client.request.create({
                data: {
                    datenow: daynow
                }
            });

            const valueprod = prodctaqdata.valor;
            const sptsprod = prodctaqdata.spots;

            const savesales = await client.productSale.create({
                data: {
                    product: {
                        connect: {
                            datenow: daynow
                        }
                    },
                    user,
                    name,
                    marca,
                    amount,
                    spots: sptsprod,
                    valor: valueprod
                }
            });

        } else {

            const valueprod = prodctaqdata.valor;
            const sptsprod = prodctaqdata.spots;
            const inproviuser = useraqdata.user;

            console.log(inproviuser);

            const savesales = await client.productSale.create({
                data: {
                    product: {
                        connect: {
                            datenow: daynow
                        }
                    },
                    user: inproviuser,
                    name,
                    marca,
                    amount,
                    spots: sptsprod,
                    valor: valueprod
                }
            });

        }







    }

}

export { CreateSalesUseCase };