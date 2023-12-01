import conf from '../conf/Conf';
import { Client, ID, Databases, Query } from "appwrite";

class UsersService {
    client = new Client();
    Databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createUser ({Name, Email, Status, Username}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId,
                Username,
                {
                    Name,
                    Email,
                    Status,
                    Username,
                    Profilepic: '',
                    Coverpic: '',
                    Bio: '',

                }
            )
            console.log(Username)
        } catch (error) {
            console.log("Appwrite Service:: createUser :: error",error)
        }
    }

    async updateUser () {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId,
                Username,
                {
                    Profilepic: '',
                    Coverpic: '',
                    Bio: '',
                }
            )
        } catch (error) {
            console.log("Appwrite Service:: updateUser:: error", error)
        }
    }

    async updateStatus ({Username}, status) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersCollectionId,
                Username,
                {
                    Status: status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service:: updateUser:: error", error)
        }
    }

    async getUser({Username, queries = [Query.equal("Username", Username)]}) {
        try {
            return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteUsersCollectionId,
            queries,
            )
        } catch (error) {
            console.log("Appwrite Service:: getUser :: error",error)
        }
    }
}

const userService = new UsersService();

export default userService
