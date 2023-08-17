//Copyright of Noms AKA The Fritter

import React, { useState, useEffect } from "react";

const DiscordHack = () => {
  const [isHacked, setIsHacked] = useState(false);


  useEffect(() => {
    fetch("/api/discord?breakDiscord=true", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setIsHacked(true);
        } 
      });
  }, []);

  return (
    <>
    {isHacked ?<Cum></Cum> : <Poop></Poop>}
    </>
  );
};

export default DiscordHack;
