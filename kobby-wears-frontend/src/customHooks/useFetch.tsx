import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url: string) {
  const [products, setProducts] = useState<Array>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchData = () => {
    setLoading(true);
    setErrorMessage("");
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
    fetchData();
  }, []);

  return [products, errorMessage, loading, fetchData];
}

export default useFetch;
