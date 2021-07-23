import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import db from '../../../firebase'
import { FirebaseAdapter } from "@next-auth/firebase-adapter"


export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: "34888984898-idrc74dgh76jcvm7odd6aaq9l4sq5ko6.apps.googleusercontent.com",
      clientSecret: 'g457P4Y5Je1hMeq0XAoND8n0',
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(db),

  
})


/**import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {db} from '../../../firebase'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: "34888984898-idrc74dgh76jcvm7odd6aaq9l4sq5ko6.apps.googleusercontent.com",
      clientSecret: 'g457P4Y5Je1hMeq0XAoND8n0',
    }),
    // ...add more providers here
    
  ],
  //adapter:firebaseAdapter(db),

  
})**/