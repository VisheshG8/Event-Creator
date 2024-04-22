import { ID, Account, Client } from 'appwrite'
import Config from 'react-native-config'
import Snackbar from 'react-native-snackbar'
import { Linking } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn';

async function openLink(url:any) {
    try {    
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: 'gray',
          preferredControlTintColor: 'white',
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
        }).then((result) => {
          console.log(JSON.stringify(result))
        })
      } else Linking.openURL(url)
    } catch (error) {
      console.log(error)
    }
  }



const appwriteClient = new Client()

const APPWRITE_ENDPOINT:string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID:string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    name:string;
    email:string;
    password:string;
}

type LoginUserAccount = {
    email:string;
    password:string;
}

class AppwriteService {
    account;
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient);
    }

    async createAccount({email, password, name}: CreateUserAccount){
        try {
            
            const userAccount =  await this.account.create(ID.unique(), email, password, name);
            
            if(userAccount){
                // Call login method
                return this.login({email, password})
            }

        } catch (error) {
            Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Service :: createAccount() :: " + error)
            
        }
    }

    async login({email, password}:LoginUserAccount){

        try {
           return await this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Service :: loginAccount() :: " + error) 
        }
    }

    async oAuthLogin(navigation:any){

        try {
            const authUrl = await this.account.createOAuth2Session('google',[],navigation.reset({index: 0, routes: [{ name: 'Login' }]}));
            const result = await openLink(String(authUrl));
            if(result! === 'success'){
                navigation.navigate("Home")
            } 
            
        } catch (error) {
            Snackbar.show({
            text: String(error),
            duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite Service :: loginAccount() :: " + error) 
        }
    }

    

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
        }
    }

}

export default AppwriteService
