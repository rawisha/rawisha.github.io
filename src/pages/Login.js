import Navbar from '../Components/Navbar'
import "../styles/Login.css"
import Footer from '../Components/Footer'
import { login, resetPassword } from '../firebase-config'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailResetRef = useRef();

  function showReset(){
    setError('')
    setClicked((clicked) => !clicked);
  }

  const handleReset = async (e) => {
    e.preventDefault()
    if(!emailResetRef.current.value) return setError('Please enter email')
    setError('')
    setLoading(true);
    try {
      await resetPassword(emailResetRef.current.value)
      setSuccess("Reset mail sent! Follow the link and reset your password. You'll be shortly redirected back to home.")
      setTimeout(() => {
        setError("")
        setSuccess('')
        setClicked(false)
      }, 4000)
    } catch (error) {
      if(error.code === 'auth/invalid-email') return setError ("Account doesn't exist! You'll be shortly redirected back to sign in.");
      if(error.code === 'auth/user-not-found') return setError ("Account doesn't exist! You'll be shortly redirected back to sign in");
      setError(error)
    }
    setLoading(false);
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if(!emailRef.current.value) return setError('Please enter email')
    setError('')
    setLoading(true);
    try{
      await login(emailRef.current.value, passwordRef.current.value)
      setSuccess('Success! You are now logged in and being redirected to Home!')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (err) {
      setLoading(false);
      if(err.code === 'auth/wrong-password') return setError("Wrong password! Try again.");
      if(err.code === 'auth/user-not-found') return setError("Account doesn't exist! Please sign up.");
      if(err.code === 'auth/invalid-email') return setError("Invalid mail! Try with another mail adress");
      if(err.code === 'auth/internal-error') return setError("Something went wrong, please try again");
      emailRef.current.value = '';
      passwordRef.current.value = '';
    }
    setLoading(false);
  }
  
  return (
    <div>
      <Navbar />
        <div className="loginFormContainer">
          <form className="loginForm">
            {clicked ? <>
              <h1>Reset Password</h1>
              <div className="output">
                {error && <div className="error" >{error}</div>}
                {success && <div className='success'>{success}</div>}
              </div>
              <input type="email" placeholder="Email" ref={emailResetRef}></input>
              <p className="resetBack" onClick={showReset}><b>&#x2190; Back</b></p>
              <button disabled={loading} onClick={handleReset}><h2>Reset Password</h2></button>
            </> : <>
              <h1>Sign in</h1>
              <div className="output">
                  {error && <div className="error" >{error}</div>}
                  {success && <div className='success'>{success}</div>}
              </div>
              <input type="email" placeholder="Email" ref={emailRef}></input>
              <input type="password" placeholder="Password" ref={passwordRef}></input>
              <p className="reset" onClick={showReset}><b>Reset Password?</b></p>
              <button disabled={loading} onClick={handleLogin}><h2>Login</h2></button>
              <p className="not-a-member">Not a Member? <br></br><a href="/signup">Sign Up!</a></p>
            </>}
          </form>
        </div>
        <Footer />
    </div>
  )
}
