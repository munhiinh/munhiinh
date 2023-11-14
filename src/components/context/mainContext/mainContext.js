import React, { useEffect, useState } from "react";
import data from "../../../../data.json";
const MainContext = React.createContext();
export const MainItem = (props) => { 
  const [language, setLanguage] = useState(data.eng);
  const [langName, setLangName] = useState("English");
  const [user, setUser] = useState(0);

  useEffect(()=>{
    getLanguage();
    getAdmin();
  },[]);
  const getLanguage = () =>{
    if(localStorage.getItem("language")){
      if(localStorage.getItem("language") == 0){
        // eng = 0 || mn = 1
        setLangName("English")
        setLanguage(data.eng);
        return
      }else { 
        setLangName("Монгол")
        setLanguage(data.mn);
        return
      } 
    }
  }
  const onChangeLanguage = (param) =>{ 
    if(param === 0){
      localStorage.setItem("language", 0);
      return getLanguage();
    }else{
      localStorage.setItem("language", 1);
      return getLanguage();
    }
  }
  const getAdmin = () =>{
    if(localStorage.getItem("localId")){
      setUser(1)
    }
  }
  const logout = () =>{
    localStorage.removeItem("idToken")
    localStorage.removeItem("localId")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("expireDate")
    setUser(0);
    getLanguage();
  }
   return (
    <MainContext.Provider
      value={{langName, language, onChangeLanguage, user, logout}}>
      {props.children}
    </MainContext.Provider>
  );
};
export default MainContext;
