import React, { useEffect } from "react";
import { dataSagaActions, dataSelectors } from "../store/data";
import { useDispatch, useSelector } from "react-redux";
import "../styles/CardPage.css";

export default function CardPage() {
  const dispatch = useDispatch();

  // const data = useSelector(dataSelectors.selectSearchedData);
  // const data = useSelector(dataSelectors.selectFilteredData);
  // const data = useSelector(dataSelectors.selectSortedData);
  const data = useSelector(dataSelectors.selectAllFilters);

  useEffect(() => {
    dispatch(dataSagaActions.sagaGetData());
  }, []);

  return (
    <div className="items-container">
      {data?.map((item) => (
        <div className="item-container" key={item.uuid}>
          <p>{item.title}</p>
          <p>{item.status}</p>
          <p>{item.statusCode}</p>
          <p>{item.statusPercentage}</p>
        </div>
      ))}
    </div>
  );
}
