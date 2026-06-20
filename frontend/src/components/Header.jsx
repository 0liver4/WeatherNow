/*
  Header.jsx
  - Top bar component that shows the app logo and the `UnitsMenu`.
  - `UnitsMenu` is responsible for toggling between metric and imperial units
    and is mounted here so its dropdown can be positioned relative to header.
*/

import Logo from '../assets/images/logo.svg'
import UnitsMenu from './UnitsMenu'

function Header() {
  return (
    <div className="w-full min-h-16 bg-[rgba(2,1,43,1)] flex items-start justify-between pt-5 px-7">

      {/* Logo */}
      <img
        src={Logo}
        alt="OPWeather Logo"
        className="w-40 sm:w-48 md:w-80"
      />

      {/* Units Menu */}
      <UnitsMenu />

    </div>
  )
}

export default Header