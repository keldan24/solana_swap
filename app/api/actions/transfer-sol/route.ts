import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS} from "@solana/actions"
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { SystemProgram } from "@solana/web3.js";
import { Transaction, PublicKey } from "@solana/web3.js";

export async function GET(request: Request) {    
  const responseBody : ActionGetResponse = {
    icon: "https://res.cloudinary.com/dek4edhda/image/upload/v1728419177/Asset_10Asset_utknt1.png",
    description: " Help us to support solana blockchain",
    title: "Donate",
    label: " Hit me! ",
    // error: {
    //   message: "Blinks not fully implemented",
    // },
    // type: "action",
  }  
  const response = Response.json(responseBody, {headers: ACTIONS_CORS_HEADERS}); 
  return response
}


export async function POST(request: Request) {   
  
  const requestBody: ActionPostRequest  = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);

  const user = new PublicKey(userPubkey);

  const connection = new Connection(clusterApiUrl("devnet"))

  const ix = SystemProgram.transfer({
    fromPubkey: user,
    toPubkey: new PublicKey('HFV94PdaUUS2kkc1cz9MjmUGWEbKPs5LEYksQUFzoe4o'),
    lamports: 1000000000    
  })

  const tx = new Transaction();
  tx.add(ix)
  tx.feePayer = user
  tx.recentBlockhash = (await connection.getLatestBlockhash({commitment: "finalized"})).blockhash;
  const serialTX = tx.serialize({requireAllSignatures: false, verifySignatures: false}).toString("base64")

  const response : ActionPostResponse = {
    transaction: serialTX,
    message: "Public key "+userPubkey,
    // type: "transaction",
  }  
  return Response.json(response, {headers: ACTIONS_CORS_HEADERS})
}


export async function OPTIONS(request: Request) {
  return new Response(null, {headers: ACTIONS_CORS_HEADERS})
}