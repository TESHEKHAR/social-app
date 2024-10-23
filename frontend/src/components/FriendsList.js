import React from 'react'

function FriendsList() {

    const Friends=[]
  return (
    <>
    <div>FriendsList</div>
    <ul>
        {
            Friends.map(friend => (
                <li key={friend._id}>
                    <img src={friend.imageUrl} alt={friend.name} width="50" height="50" />
                    <div>
                        <h3>{friend.name}</h3>
                        <p>Mutual Friends: {friend.mutualFriends}</p>
                        <a href={friend.profileLink} target="_blank" rel="noopener noreferrer">
                            View Profile
                        </a>
                    </div>
                </li>
            ))
        }
    </ul>
    </>
  )
};

export default FriendsList