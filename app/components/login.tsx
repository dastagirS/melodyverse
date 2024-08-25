export function Login(){
  return(
  <div className="login">
      <div className="login-art">
      <img src="/logo.png"/>
      </div>
      <div className="login-screen">
        <form>
          <input className="email" placeholder="Email"/>
          <input className="password" placeholder="Password"/>
          <button>Login</button>
        </form>
        </div>
      </div>
  )
}
