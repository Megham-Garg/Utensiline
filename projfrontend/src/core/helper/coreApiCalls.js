import {API} from '../../backend'

export const getProducts = async () => {
    try {
        const res = await fetch(`${API}product`, { method: "GET" });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}