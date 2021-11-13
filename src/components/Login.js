import { githubProvider, socialMediaAuth } from '../firebase'
const Login = ({ setIsLogin }) => {
  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider)
    console.log(res)
    if (res.displayName) {
      setIsLogin(true)
    } else {
      console.log(res)
    }
  }
  return (
    <>
      <button onClick={() => handleOnClick(githubProvider)}>github</button>
    </>
  )
}

export default Login
