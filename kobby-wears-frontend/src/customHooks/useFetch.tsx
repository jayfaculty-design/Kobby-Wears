import { useEffect, useState } from "react";
import axios from "axios";

function useFetch<T>(
  url: string
): [T | null, string | null, boolean, () => void] {
  const [products, setProducts] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchData = () => {
    axios({
      url: url,
      method: "get",
    })
      .then((res) => {
        setLoading(false);
        setErrorMessage("");
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setErrorMessage("Error in getting products");
        setLoading(false);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    setErrorMessage("");
    fetchData();
  }, []);

  return [products, errorMessage, loading, fetchData];
}

export default useFetch;
