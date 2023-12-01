import React, { useEffect, useState } from 'react'
import { UserList, Button} from './index'
import { Link } from 'react-router-dom'
import {TiArrowBack} from 'react-icons/ti'
import { useSelector } from 'react-redux'
import conf from '../conf/Conf'
import {Client, Databases, ID, Query} from 'appwrite'

function ChatBody() {

  const [selectedUser, setSelectedUser] = useState(null)
  const [recipientd, setRecipientd] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [client, setClient] = useState(null)
  const [database, setDatabase] = useState(null)

  const senderd = useSelector(state =>state.userData[1].id)
  const recipient = String(recipientd)
  const sender = String(senderd)


  useEffect(() => {
    const client = new Client()
    client.setProject(conf.appwriteProjectId);
    client.setEndpoint(conf.appwriteUrl)
    setClient(client)
    const databases = new Databases(client)
    setDatabase(databases)


    //fetch initial message
    fetchMessages()

    //subscribe to real time update
    const subscription = client.subscribe(conf.appwriteMessagesCollectionId, (event) => {
      fetchMessages()
    })
    
    return () => {
      if(subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
      }
      
    }
  }, [recipient, message ])

  const fetchMessages = async () => {
    try {
      const response = await database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteMessagesCollectionId,
        [
          Query.limit(100)
        ]
      )
      
      setMessages(response.documents)

    } catch (error) {
      console.log('error fetching messages: ', error)
    }
  }

  const sendHandler = async () => {
    const timestamp = Date.now().toString();
    try {
      await database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteMessagesCollectionId,
        ID.unique(),
        {
        message: message,
        sender: sender,
        recipient: recipient,
        timestamp: timestamp
      })

      setMessage('')
    } catch (error) {
      console.log('error sending message:', error)
    }
  
  }


  const userMessages = messages.filter(
    (message) => (message.sender === sender && message.recipient === recipient) || (message.sender === recipient && message.recipient === sender) 
  )



  const handleUserClick = (user) => {
    setSelectedUser(user)
    setRecipientd(user.id)
  }


  return (
    <div className='m-4'>
      
          {/* <UserList onUserClicks={handleUserClick} /> */}
          {selectedUser ? (
            <>
            <div  className=' h-full '>
              <div className='fixed inset-x-0 top-0'>
                <div className=' flex gap-4 px-3 p-2  shadow-md bg-orange-400 rounded-2xl  items-center'>
                    <Link to='/home'>
                      <div className=''>
                        <span className='float-left text-5xl my-auto flex justify-center items-center opacity-50'>
                          <Link to = '/home'><TiArrowBack /></Link>
                        </span>
                      </div>
                    </Link>
                    <div className=''>
                      <img className='w-12 h-14 rounded-full' src={selectedUser.pic} alt="" />
                    </div>
        
        
                    <div className='p-3 items-center'>
                      <h2 className='text-lg font-semibold text-gray-800/90'>{selectedUser.name}</h2>
                      {selectedUser.status == true ? (
                        <span className='text-sm text-white/95'>online</span>
                      ) : (
                        <span className=' text-sm text-white/95'>offline</span>
                      )}
                      
                    </div>
        
                </div>
              </div>
    
    
                <div className='mb-28 mt-36 overflow-y-clip'>
                  {userMessages.map((msg,index) => (
                    <div key={index}  className=''>
                      {(() => {
                        if (msg.sender == sender) {
                          return (
                            <div className='float-right  w-3/4'>
                              <div className='float-right shadow-xl w-auto bg-orange-500/50 rounded-2xl p-3 m-2'>
                                {msg.message}
                              </div>
                            </div>
                        )}else {
                          return (
                            <div
                            className=' w-3/4 flex gap-2'>
                              <div className='w-auto shadow-xl bg-gray-200/50 rounded-2xl p-4 m-2'>
                                {msg.message}
                              </div>
                            </div>
                        )}
                      })()}
                    </div>
                  )).reverse()}
                </div>
      
              <div className='fixed bg-white flex  inset-x-0 bottom-0  px-2'>
              <input 
                type='text'
                className='px-3 py-2 rounded-lg bg-white text-black
                outline-none focus:bg-gray-50 duration-200 border
                border-gray-200 w-full'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Message...'
              />
                <Button
                className='bg-orange-600 hover:bg-orange-300'
                onClick = {sendHandler}
                >Send</Button>
              </div>
    
            </div>
            
            </>
          ) : (
            <UserList onUserClicks={handleUserClick} />
          )} 
      

    </div>
  )
}

export default ChatBody