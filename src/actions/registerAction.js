export const createRegister = (
  first_name,
  last_name,
  company_name,
  email,
  number,
  code,
  password,
  ecoComplaince
) => {
  return (dispatch) => {
    dispatch({
      type: "RESET_REGISTER_MESSAGE",
      loading: false,
    });
    if (number.toString().length < 7) {
      alert("Mobile Number is Invalid");
      return;
    }
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/signup_new.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secret_key: "a1f33e3555cae4dcb631d63ed534f1d1",
      },
      body: JSON.stringify({
        name: `${first_name} ${last_name}`,
        company_name: company_name,
        email: email,
        number: number,
        num_code: code,
        password: password,
        eco_complaince: ecoComplaince,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        const auth_id = response?.data?.auth_id;
        const empId = response?.data?.id;
        const first_name = response?.data?.name?.split(" ")[0];
        if (response.status != 200) {
          alert(response.message);
          dispatch({
            loading: true,
          });
          return;
        } else if (
          auth_id !== "" &&
          auth_id !== null &&
          auth_id !== undefined &&
          response.status === 200
        ) {
          dispatch({
            type: "REGISTER_IN",
            authError: null,
            auth_id,
            employee_id: empId,
            authMessage: "Signing you in...",
            loading: true,
          });
          localStorage.setItem("auth_id1", auth_id);
          localStorage.setItem("name", first_name);
          localStorage.setItem("eco_complaince", ecoComplaince);
          localStorage.setItem("isFirstLogin", 1);
          debugger;
          window.location = "/otp";
        }
      })
      .catch((error) => {
        const authError = JSON.stringify(error);
        console.log(authError);
        dispatch({
          type: "REGISTER_IN",
          authError,
          auth_id: null,
          employee_id: null,
          authMessage: "Error occurred in signing in!",
          loading: true,
        });
      });
  };
};
