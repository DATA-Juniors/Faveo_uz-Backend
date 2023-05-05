
import { Request, Response } from 'express'
import { clearPhones, createAppInfo, createAppPhone, getInfo, updateAppInfo } from '../../service';

export default async (req: Request, res: Response) => {
    try {

        let  { name, location, phones } = req.body

        let info = await getInfo()        

        if (!info) {
            info = await createAppInfo({
                name,
                location_geo: location.geo,
                location_address: location.address
            })
        }
        else {
            info = await updateAppInfo({
                name,
                location_geo: location.geo,
                location_address: location.address
            }, info.id)
        }

        await clearPhones()

        for(let phone of phones) {
            await createAppPhone(phone)
        }

        const details = {
            name: info.name,
            location: {
                geo: info.location_geo,
                address: info.location_address
            },
            phones
        }

        res.status(200).json({
            message: "App info updated",
            info: details
        })
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}