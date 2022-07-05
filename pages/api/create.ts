import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../lib/prisma'

type Data = {
   message: string,
   user?:{}
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    if(req.method !== 'POST'){
        return res.status(405).json({message:'Method not allowed'})
    }
    const user= await prisma.user.create({data: req.body})
    
    return res.status(201).json({message:'User successfully saved',user: user})
}