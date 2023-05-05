import { createAppInfo, getInfo, getPhone } from "../../service/appInfo.service";
import { Request, Response, NextFunction } from 'express'


export default async (req: Request, res: Response) => {
    try {

        let info  = await getInfo();

        if (!info) {
            info = await createAppInfo({
                name: "",
                location_geo: "",
                location_address: ""
            })
        }

        const phones = await getPhone()

        const details = {
            name: info.name,
            location: {
                geo: info.location_geo,
                address: info.location_address
            },
            phone: phones
        }

        res.status(200).json({
            message: "App Info Retrived",
            info: details
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
        })
    }
    
}