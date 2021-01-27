import { API } from "../../backend";
// import { cartEmpty } from "../../core/helper/cartHelper";

export const signup = async (user) => {
  try {
        const response = await fetch(`${API}user/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        return await response.json();
    } catch (err) {
        return console.error(err);
    }
};

export const signin = async (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  try {
        const response = await fetch(`${API}user/login/`, {
            method: "POST",

            body: formData,
        });
        console.log("SUCCESS", response);
        return await response.json();
    } catch (err) {
        return console.error(err);
    }
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("customToken", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("customToken")) {
    return JSON.parse(localStorage.getItem("customToken"));
    //TODO: compare customToken with database json token
  } else {
    return false;
  }
};

export const signout = async (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;

  if (typeof window !== undefined) {
    localStorage.removeItem("customToken");
    // cartEmpty(() => {});

    try {
          const response = await fetch(`${API}user/logout/${userId}`, {
              method: "GET",
          });
          console.log("Signout success");
          next();
          return await response.json();
      } catch (err) {
          return console.error(err);
      }
  }
};
