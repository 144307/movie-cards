import "./Header.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import SearchBar from "../SearchBar/SearchBar";

function Header() {
  const userData = useSelector((state: RootState) => state.user);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (userData.profileImageURL) {
      const imageURL = supabase.storage
        .from("profile-images")
        .getPublicUrl(userData.profileImageURL).data.publicUrl;
      setProfileImage(imageURL);
    }
  }, [userData.profileImageURL]);

  return (
    <header className="header">
      <SearchBar></SearchBar>
      {/* <div className="header__username">{userData.userId}</div> */}
      <div className="header__username">{userData.username}</div>
      {profileImage ? (
        <div className="profile-image__wrapper">
          <img
            className="profile-image"
            src={profileImage}
            alt={profileImage}
          />
        </div>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
