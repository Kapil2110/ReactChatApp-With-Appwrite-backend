import conf from '../conf/Conf';
import { Client, ID, Databases,  } from "appwrite";

export class Service {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async sendMessage( messages, sender, recipient) {
        try {
            
            console.log(messages, typeof(messages))
            console.log(sender, typeof(sender))
            console.log(recipient, typeof(recipient))
            
            if(messages && messages !== ''){
                const timestamp = Date.now().toString();
                    return await this.databases.createDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteMessagesCollectionId,
                        ID.unique(),
                        {
                            message: messages,
                            sender: sender,
                            recipient: recipient,
                            timestamp: timestamp,
                        })
                
            }
        } catch (error) {
            console.log("Appwrite service :: sendMessage :: error", error)
        }
    }
}
 const service = new Service()

 
 export default service