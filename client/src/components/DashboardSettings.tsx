// Date: 18/08/2021
//
// Description: This component is used to display the settings page of the dashboard.
//              It contains the following:
//              - User info
//              - Change username
//              - Change email
//              - Change password
//              - Delete account
//
// Change history:
// Date: 18/08/2021 

import { useEffect, useState} from 'react';
import '../style/DashboardSettings.css';

import show_password_img from '../assets/show.png';
import hide_password_img from '../assets/hide.png';
import avatar_img from '../assets/personIcon.png';

import { usePopup } from "./PopupProvider";

type Props = {}

function DashboardSettings({}: Props) {
  const { showPopup } = usePopup();

  const [userId, setUserId] = useState<number>();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  //const [password, setPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newConfirmPassword, setNewConfirmPassword] = useState<string>('');
  const [userIcon, setUserIcon] = useState<string>('');
  const [uploadedIcon, setUploadedIcon] = useState<File | null>(null);
  const [deletePassword, setDeletePassword] = useState<string>('');


  const [showPassword, setShowPassword] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('http://localhost:8080/protected',{
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Request failed');
        }
  
        const data = await response.json();

        setUserId(data.userId);
      }
      catch(error)
      {
        console.error(error);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if(!userId)
    {
      return;
    }
    const fetchData = async () => {
      try
        {
          const response = await fetch(`http://localhost:8080/get_userInfo/${userId}`, {
            method: 'GET'
          });
          
          if(!response.ok)
          {
            throw new Error('Request failder');
          }

          const data = await response.json();
          if(data.success === 0)
          {
            setUsername('');
            setEmail('');
            setUserIcon('');
          }
          else if(data.success === 1)
          {
            setUsername(data.username);
            setEmail(data.email);
            console.log(data.icon);
            const imageUrlWithForwardSlashes = data.icon.replace(/\\/g, '/');
            setUserIcon(imageUrlWithForwardSlashes);
          }
        }
        catch(error)
        {
          console.error(error);
        }
        console.log(userIcon);
    }
    fetchData();
  }, [userId])

  const changePasswordVisibility = (e: any, whichPass: number) => {
    e.preventDefault();

    setShowPassword(prevState => {
      const newState = [...prevState];
      newState[whichPass - 1] = !newState[whichPass - 1];
      return newState;
    });
  };

  const handleUserIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedIcon(e.target.files?.[0] || null);
  };

  const handleUserIconChangeSubmit = async (e: any) => {
    e.preventDefault();

    if(!uploadedIcon)
    {
      showPopup("There are no loaded files! Load file and try again!");
      return;
    }

    try
    {
      const formData = new FormData();
      formData.append('file', uploadedIcon);

      const response = await fetch(`http://localhost:8080/put_userIcon/${userId}`, {
            method: 'POST',
            credentials: 'include',
            body: formData, // Content-Type will be set automatically
        });

      if(!response.ok)
      {
        throw new Error('Request failed');
      }

      const data = await response.json();

      if(data.success === 0)
      {
        showPopup("User icon not changed! Try again!");
      }
      else if(data.success === 1)
      {
        showPopup("User icon changed!");
      }
    }
    catch(error)
    {
      console.error(error);
    }
  }

  const handleUsernameChange = (e : string) => { 
    setUsername(e);
  };

  const handleUsernameChangeSubmit = async (e : any) => {
    e.preventDefault();

    try
    {
      const response = await fetch('http://localhost:8080/post_userUpdateUsername', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId, 
          username: username}),
      });

      if(!response.ok)
      {
        throw new Error('Request failed');
      }

      const data = await response.json();

      if(data.success === 1)
      {
        showPopup("Username successfully changed!");
      }
      else if(data.success === 0)
      {
        showPopup("There was and error wiht username change! Try again later!");
      }

    }
    catch(error)
    {
      console.error(error);
    }
  };

  const handleEmailChange = (e: string) => {
    setEmail(e);
  }

  const handleEmailChangeSubmit = async (e: any) => {
    e.prevendDefault();
    
    try
    {
      const response = await fetch('http://localhost:8080/post_userUpdateEmail', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId, 
          email: email}),
      });

      if(!response.ok)
      {
        throw new Error('Request failed');
      }

      const data = await response.json();

      if(data.success === 1)
      {
        showPopup("Email successfully changed!");
      }
      else if(data.success === 0)
      {
        if(data.inUse === 1)
        {
          showPopup("Email alredy in use!");
        }
        else
        {
          showPopup("There was and error wiht email change! Try again later!");
        }
      }

    }
    catch(error)
    {
      console.error(error);
    }
  }

  const handleOldPasswordChange = (e: string) => {
    setOldPassword(e);
  } 

  const handleNewPasswordChnage = (e: string) => {
    setNewPassword(e);
  }

  const handleNewConfirmPasswordChange = (e: string) => {
    setNewConfirmPassword(e);
  }

  const handlePasswordChangeSubmit = async (e: any) => {
    e.preventDefault();
    
    if(newPassword === newConfirmPassword)
    {
      try
      {
        const response = await fetch('http://localhost:8080/post_userUpdatePassword', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId, 
            oldPassword: oldPassword,
            newPassword: newPassword}),
        });

        if(!response.ok)
        {
          throw new Error('Request failed');
        }

        const data = await response.json();

        if(data.success === 1)
        {
          showPopup("Password successfully changed!");
        }
        else if(data.success === 0)
        {
          showPopup("There was and error wiht password change! Try again later!");
        }
      }
      catch(error)
      {
        console.error(error);
      }
    }
    else
    {
      showPopup("Your new password and confirm passowrd must match!");
    }
  }

  const handleDeletePasswordChange = (e: string) => {
    setDeletePassword(e);
  }

  const handleDeleteAccountSubmit = async (e: any) => {
    e.preventDefault();

    try
    {
      const response = await fetch('http://localhost:8080/post_userDelete', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId, 
          password: deletePassword}),
      });

      if(!response.ok)
      {
        throw new Error('Request failed');
      }

      const data = await response.json();

      if(data.success === 1)
      {
        showPopup("Account successfully deleted!");
      }
      else if(data.success === 0)
      {
        showPopup("There was and error wiht account deletion! Try again later!");
      }
    }
    catch(error)
    {
      console.error(error);
    }
  } 

  return (
    <div className='dashboard-settings-container'>
      <h2> Settings </h2>
      <div className='dashboard-settings-user-container'>
        <div className='dashboard-settings-user-info'>
          <h3> User info </h3>
          <div className='dashboard-settings-user-info-container'>
            <img src={userIcon ? userIcon : avatar_img} alt="user icon image"/>
            <div className="dashboard-settings-user-info-text">
              <p> Username: {username}</p>
              <p> Email: {email}</p>
            </div> 
          </div>
        </div>
        <div className='dashboard-settings-card'>
          <h3> Change user icon </h3>
          <form>
            <label> New user icon </label>
            <input type='file' onChange={(e) => handleUserIconChange(e)}/>
            <button type='submit' onClick={(e) => handleUserIconChangeSubmit(e)}> Change user icon </button>
          </form>
        </div>
        <div className='dashboard-settings-card'>
          <h3> Change username </h3>
          <form>
            <label> New username </label>
            <input type='text' onChange={(e) => handleUsernameChange(e.target.value)}/>
            <button type='submit' onClick={(e) => handleUsernameChangeSubmit(e)}> Change username </button>
          </form>
        </div>
        <div className='dashboard-settings-card'>
          <h3> Change email </h3>
          <form>
            <label> New email </label>
            <input type='text' onChange={(e) => handleEmailChange(e.target.value)}/>
            <button type='submit' onClick={(e) => handleEmailChangeSubmit(e)}> Change email </button>
          </form>
        </div>
        <div className='dashboard-settings-card'>
          <h3> Change password </h3>
          <form>
            <label> Old password </label>
            <div className='dashboard-settings-card-password-button'>
              <input type={!showPassword[0] ? 'password' : 'text'} onChange={(e) => handleOldPasswordChange(e.target.value)}/>
              <button className='dashboard-password-button' onClick={(e) => changePasswordVisibility(e, 1)}> { showPassword[0] ? <img src={show_password_img} alt="show password img"/> : <img src={hide_password_img} alt="hide password img" />}</button>
            </div>
            <label> New password </label>
            <div className='dashboard-settings-card-password-button'>
              <input type={!showPassword[1] ? 'password' : 'text'} onChange={(e) => handleNewPasswordChnage(e.target.value)} />
              <button className='dashboard-password-button' onClick={(e) => changePasswordVisibility(e, 2)}> { showPassword[1] ? <img src={show_password_img} alt="show password img"/> : <img src={hide_password_img} alt="hide password img" />}</button>
            </div>
            <label> Confirm new password </label>
            <div className='dashboard-settings-card-password-button'>
              <input type={!showPassword[2] ? 'password' : 'text'} onChange={(e) => handleNewConfirmPasswordChange(e.target.value)}/>
              <button className='dashboard-password-button' onClick={(e) => changePasswordVisibility(e, 3)}> { showPassword[2] ? <img src={show_password_img} alt="show password img"/> : <img src={hide_password_img} alt="hide password img" />}</button>
            </div>
            <button type='submit' onClick={(e) => handlePasswordChangeSubmit(e)}> Change password </button>
          </form>
        </div>
        <div className='dashboard-settings-card'>
          <h3> Delete account </h3>
          <form>
            <label> Password </label>
            <div className='dashboard-settings-card-password-button'>
              <input type={!showPassword[3] ? 'password' : 'text'} onChange={(e) => handleDeletePasswordChange(e.target.value)}/>
              <button className='dashboard-password-button' onClick={(e) => changePasswordVisibility(e, 4)}> { showPassword[3] ? <img src={show_password_img} alt="show password img"/> : <img src={hide_password_img} alt="hide password img" />}</button>
            </div>
            <button type='submit' onClick={(e) => handleDeleteAccountSubmit(e)}> Delete account </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DashboardSettings