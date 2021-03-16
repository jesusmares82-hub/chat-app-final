import React from 'react';
import {IoMdPaperPlane} from "react-icons/io"

import './UserForm.css';

const UserForm = ({ setMessage, sendMessage, message }) => (
  
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Input message and send."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}> <IoMdPaperPlane /> Send</button>
  </form>
)

export default UserForm;