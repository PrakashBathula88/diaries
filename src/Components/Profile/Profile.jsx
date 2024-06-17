import React, { useRef } from "react";
// import AuthContext from "../SignupProvider/Signinprovider";
import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import "../Signup/Signin.css";
import "../Profile/Profile.css";
import { MdOutlineCancelPresentation } from "react-icons/md";
export default function Profile() {
  const nameRef = useRef();
  const profileRef = useRef();

  const submitProfile = async (event) => {
    event.preventDefault();
    const displayName = nameRef.current.value;
    const photoUrl = profileRef.current.value;

    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDbj2ZqFZQTWUUSIu5W6zB9GdR8kjJlTWI`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          displayName,
          photoUrl,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      {/* <p>
        Your profile is 64% completed. A completed profile has higher chances of<br/>
        landing a job. Complete Now
      </p> */}
      <h1 className="contact_details">Contact Details</h1>
      <h1 className="icon_cancel">
        <MdOutlineCancelPresentation />
      </h1>
      <form onSubmit={submitProfile} className="All-input-fields">
        <FaGithub className="icons_cojt" />
        <label>Full Name</label>
        <input type="text" ref={nameRef} className="input_fields"  placeholder="Enter Full Name"required />

        <CiGlobe  className="icons_cojt"/>
        <label>Profile Photo URL</label>
        <input type="text" ref={profileRef}placeholder="Enter URL" className="input_fields" required />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
