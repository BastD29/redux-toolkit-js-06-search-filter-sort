import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataSagaActions, dataSelectors } from "../store/data";

export default function CardPage() {
  const dispatch = useDispatch();

  const data = useSelector(dataSelectors.getData);
  console.log("data", data);

  useEffect(() => {
    dispatch(dataSagaActions.sagaGetData());
  }, []);

  return (
    <>
      {data?.map((campaign) => (
        <div key={campaign.uuid}>
          <p>{campaign.title}</p>
        </div>
      ))}
    </>
  );
}
