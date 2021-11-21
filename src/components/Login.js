import { githubProvider, socialMediaAuth } from '../firebase'
import { memo } from 'react'

const NoMemoLogin = ({ setIsLogin }) => {
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

export const Login = memo(NoMemoLogin)
