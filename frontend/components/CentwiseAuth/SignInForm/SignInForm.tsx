// import React, { useState, ChangeEvent, FormEvent } from "react";
// import googleLogoPath from "../../../../public/images/GoogleLogo.png";
// import centwiseLogo from "../../../../public/images/CentwiseLogo.png";
// import styles from "../FormStyles.module.css";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ForgotPassModal from "./forgotPassModal";


// const SignInForm = () => {

//     const [email, setEmail] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [showForgotPassword] = useState<boolean>(false); 
//     const navigate = useNavigate(); 


//     const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
//         event.preventDefault();
//         await handleLocalSignin(email, password);
//         // You can perform additional actions after the login if needed
//       };
    
//       const handleLocalSignin = async (email: string, password: string) => {
//         try {
//           const response = await axios.post('/api/user/localLogin', {
//             email: email,
//             password: password,
//           });

//           if(response.status === 200){
//             navigate('/dashboard');
//           }else if(response.status === 400){
//             alert('User does not exist');
//             navigate('/user/signin');
//           }else{
//             alert('Cannot process your request at this time');
//             navigate('/');
//           }
    
//         } catch (error) {
//           console.error('Error logging in:', error); 
//         }
//       };

//   const handleGoogleOauth = () => {
//     window.location.href = '/api/user/auth/google';
//   }
//   const handleForgotPasswordClick = async () => {
//     try {
//       const response = await axios.post('/api/user/forgotpassword', {
//         email: 'mananvijay7@gmail.com',
//       });
//       console.log(response);
//       //alert('Password reset email sent. Check your inbox.');
//     } catch (error) {
//       console.error('Error sending password reset email:', error);
//     }
//   };
//     // const handleBackToSignInClick = (): void => {
//     //   setShowForgotPassword(false);
//     // };  
    
//     return (
//         <div className={styles.container}>
//             <div className={styles.centwiseLogo}>
//                 <img src={centwiseLogo} alt="Centwise Logo" height="40" width="160"/>
//             </div>
//             {showForgotPassword ? (
//                 <div>
//                     <form onSubmit={handleSubmit}>
//                         {/* <button type="button" onClick={handleBackToSignInClick}>Back to Sign In</button> */}
//                     </form>
//                 </div>
//             ) : (
//                 <div className={styles.mainFormContainer}>
//                     <h2 className={styles.formHeading}>Sign in to account</h2>

//                     <button className={styles.googleButton} onClick={handleGoogleOauth}>
//                         <img className={styles.googleLogo} src={googleLogoPath} alt="Google Logo" />
//                         <p className={styles.googleText}><b>Sign in with Google</b></p>
//                     </button>

//                     <div className={styles.Or}>OR</div>

//                     <form onSubmit={handleSubmit} method='POST'>
//                         <input
//                             className={styles.inputs}
//                             value={email}
//                             onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//                             type="email"
//                             placeholder="Enter your email id"
//                             required
//                             id="email"
//                             name="email"
//                         />
//                         <br /><br />
//                         <input
//                             className={styles.inputs}
//                             value={password}
//                             onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//                             type="password"
//                             placeholder="Enter your password"
//                             required
//                             id="password"
//                             name="password"
//                         />
//                         <br /><br />
//                         <button className={styles.submitBtn} type="submit">Sign in</button>
//                     </form>
//                     <button className={styles.forgotPassword} onClick={handleForgotPasswordClick}>Forgot Password?</button>
//                 </div>
//             )}
//         </div>
//     );

// }

// export default SignInForm;



// SignInForm.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import googleLogoPath from "../../../../public/images/GoogleLogo.png";
import centwiseLogo from "../../../../public/images/CentwiseLogo.png";
import styles from "../FormStyles.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotPassModal from './forgotPassModal'; 

const SignInForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await handleLocalSignin(email, password);
    // You can perform additional actions after the login if needed
  };

  const handleLocalSignin = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/user/localLogin', {
        email: email,
        password: password,
      });

      if(response.status === 200){
        navigate('/dashboard');
      } else if(response.status === 400){
        alert('User does not exist');
        navigate('/user/signin');
      } else {
        alert('Cannot process your request at this time');
        navigate('/');
      }

    } catch (error) {
      console.error('Error logging in:', error); 
    }
  };

  const handleGoogleOauth = () => {
    window.location.href = '/api/user/auth/google';
  };

  const handleForgotPasswordClick = async () => {
    // Open the modal when the "Forgot Password?" button is clicked
    setShowForgotPasswordModal(true);
  };

  const handleModalClose = () => {
    // Close the modal when needed
    setShowForgotPasswordModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.centwiseLogo}>
        <img src={centwiseLogo} alt="Centwise Logo" height="40" width="190"/>
      </div>

      <div className={styles.mainFormContainer}>
        <h2 className={styles.formHeading}>Sign in to account</h2>

        <button className={styles.googleButton} onClick={handleGoogleOauth}>
          <img className={styles.googleLogo} src={googleLogoPath} alt="Google Logo" />
          <p className={styles.googleText}><b>Sign in with Google</b></p>
        </button>

        <div className={styles.Or}>OR</div>

        <form onSubmit={handleSubmit} method='POST'>
          <input
            className={styles.inputs}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email id"
            required
            id="email"
            name="email"
          />
          <br /><br />
          <input
            className={styles.inputs}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            required
            id="password"
            name="password"
          />
          <br /><br />
          <div className={styles.forgotPassword} onClick={handleForgotPasswordClick}>Forgot Password?</div>
          <button className={styles.submitBtn} type="submit">Sign in</button>
        </form>
      </div>

      {showForgotPasswordModal && (
        <ForgotPassModal closeModal={handleModalClose} />
      )}
    </div>
  );
};

export default SignInForm;
