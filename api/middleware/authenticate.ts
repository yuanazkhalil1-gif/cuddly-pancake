import type {Request,Response,NextFunction} from "express";
import {jwtVerify} from "jose";
declare global { namespace Express { interface Request { user?: {userId:string;studentId:string;role:string} } } }
function secret(){const s=process.env.JWT_SECRET;if(!s||s.length<32)throw new Error("JWT_SECRET must be at least 32 characters.");return new TextEncoder().encode(s);}
export async function authenticate(req:Request,res:Response,next:NextFunction){try{const token=req.cookies?.access_token;if(!token){res.status(401).json({message:"Please log in."});return;}const {payload}=await jwtVerify(token,secret());if(typeof payload.sub!=="string"||typeof payload.studentId!=="string"||typeof payload.role!=="string"){res.status(401).json({message:"Invalid session."});return;}req.user={userId:payload.sub,studentId:payload.studentId,role:payload.role};next();}catch{res.status(401).json({message:"Session expired. Please log in again."});}}
export function requireStudent(req:Request,res:Response,next:NextFunction){if(req.user?.role!=="student"){res.status(403).json({message:"Student access only."});return;}next();}
