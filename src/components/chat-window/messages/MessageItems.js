import React, { memo } from 'react'
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import Presence from '../../Presence';
import ProfileAvatar from '../../ProfileAvatar';
import IconBtnControl from './IconBtnControl';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';


const MessageItems = ({message,handleAdmin,handleLike,handleDelete}) => {

    const {author,createdAt,text,likes,likeCount} = message;
    const isAdmin = useCurrentRoom(v => {return v.isAdmin});
    const admins  = useCurrentRoom(v => {return v.admins});
    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;

    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)

    const isMobile = useMediaQuery(('(max-width:992px)'));
    const [selfRef,isHover] = useHover();
    const canShowIcons  = isMobile || isHover;


    return (
        
        <li className={`padded mb=1 cursor-poointer ${isHover ? 'bg-black-02' : ''} `} ref={selfRef} >
            <div className="d-flex align-items-center font-bolder mb-1"> 
                <Presence uid = {author.uid}/>
                <ProfileAvatar src = {author.avatar} name = {author.name} className="ml-1" size= "xs" />
                <ProfileInfoBtnModal profile ={author} appearance ="link" className="p-0 ml-2 text-black" >
                    
                {canGrantAdmin &&
                <Button block onClick={() => {return handleAdmin(author.uid)}} color="orange"> 
                    {isMsgAuthorAdmin ? 'Remove Admin permissions' : 'Give admin in this room'}
                </Button> }
                </ProfileInfoBtnModal>
                <TimeAgo  datetime={createdAt}  className="font-norml text-black-45 ml-2" />
                <IconBtnControl
                    // eslint-disable-next-line no-constant-condition
                    {...(isLiked ? {color:"red"} : {})}
                    isVisible = {canShowIcons}
                    iconName = "heart"
                    toolTip = "Like this message"
                    onClick ={() => {return handleLike(message.id)}}
                    badgeContent = {likeCount}
                />
                {isAuthor &&  <IconBtnControl
                                isVisible = {canShowIcons}
                                iconName = "close"
                                toolTip = "delete this message"
                                onClick ={() => {return handleDelete(message.id)}}
                              />
                }
            </div>
            <div>
                <span className ="word-breal-all"> {text}</span>
            </div>
        </li>
    )
}

export default memo(MessageItems);
