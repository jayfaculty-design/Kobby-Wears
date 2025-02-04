import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setErrorMessage("");
    setLoading(true);
    axios({
      method: "get",
      url: url,
    })
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        setLoading(false);
        setErrorMessage("");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorMessage("Cannot find any Products");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [products, errorMessage, loading];
};

export default useFetch;
