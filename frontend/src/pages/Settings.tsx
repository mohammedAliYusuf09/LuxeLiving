import { Link } from "react-router-dom"

function Settings() {
  return (
    <>
      <h2>Settings</h2>
      <div className="flex flex-col mt-4 text-gray-400">
        <Link className="hover:text-gray-100 transition-colors ease-in-out duration-200" to={'/settings/change-password'}>Change Password</Link>
        <Link className="hover:text-gray-100 transition-colors ease-in-out duration-200" to={'/settings/change-email'}>Change Email</Link>
      </div>
    </>
  )
}

export default Settings