import { SignupInput } from "@/types/auth";
import { account,ID,database } from "@/lib/API/appwrite/appwrite";
const {
  VITE_DATABASE_ID,
  VITE_COLLECTION_ID
} =import.meta.env;

export const signup = async  ({
  data,
}: {
  data: SignupInput;
}): Promise<any> => {
  let newUserAccount;
try{

   newUserAccount = await account.create(
    ID.unique(), 
    data.email,  
    data.password,
    `${data.firstname} ${data.lastName}` 
  );
 
  const session = await account.createEmailPasswordSession(data.email, data.password);
  const userData= {
    userId:(newUserAccount).$id,
    address1:data.address1,
    dateOfBirth :data.dateOfBirth,
    mobileNumber:data.mobileNumber,
    state:data.state
   

  }
  const newUser = await database.createDocument(
    VITE_DATABASE_ID!,
    VITE_COLLECTION_ID!,
    ID.unique(),
    userData
  );
}
catch{

}

 
};


