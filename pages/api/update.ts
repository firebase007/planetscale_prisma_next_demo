import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../lib/prisma'
type Data = {
    message: string,
    user?:{}
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    console.log(req.body);
    const updatedData = req.body
    if(req.method !== 'PATCH'){
        return res.status(405).json({message:'Method not allowed'})
    }
    const user = await prisma.user.update({
        where:{
            id:updatedData.id
        },
        data:{
            name:updatedData.name,
            profession:updatedData.profession 
        }
    })

    res.status(200).json( {message: 'User details successfully updated',user: user })
}