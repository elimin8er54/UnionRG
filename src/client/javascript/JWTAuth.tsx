export const checkToken = () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  fetch(`/api/jwtauth`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // console.log(localStorage.getItem("token"));
        //localStorage.setItem("token", data.token);
      } else {
        localStorage.removeItem("token");
        document.location.href = "/login";
      }
    });
};
