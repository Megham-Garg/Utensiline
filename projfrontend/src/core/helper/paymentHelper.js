import { API } from "../../backend";

export const getmeToken = async (userId, token) => {
  try {
    const response = await fetch(`${API}payment/getToken/${userId}/${token}/`, {
      method: "GET"
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const processPayment = async (userId, token, paymentInfo) => {
  const formData = new FormData();

  for (const name in paymentInfo) {
    formData.append(name, paymentInfo[name]);
  }

  const response = await fetch(`${API}payment/processPayment/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  });
  return await response.json();
};
