import React, { useEffect, useState } from "react";
import "./List.css";

const List = () => {
  const [list, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/satdata");
      const fetchedData = await response.json();
      setData(fetchedData);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <ul className="list">
        {list.map((data) => (
          <li key={data.name}>
            <pre>
              {JSON.stringify(
                {
                  name: data.name,
                  address: data.address,
                  city: data.city,
                  country: data.country,
                  pincode: data.pincode,
                  satScore: data.satScore,
                  passed: data.passed,
                },
                null,
                2
              )}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
