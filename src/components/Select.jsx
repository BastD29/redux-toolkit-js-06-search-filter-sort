import React from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filter";
import "../styles/Select.css";

export default function Select() {
  const dispatch = useDispatch();

  const handleFilterChange = (filterType) => (e) => {
    dispatch(
      filterActions.setFilter({ filterType, filterValue: e.target.value })
    );
  };

  const handleSortChange = (e) => {
    dispatch(filterActions.setSort(e.target.value));
  };

  return (
    <div className="select-container">
      <select onChange={handleFilterChange("status")}>
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select onChange={handleFilterChange("statusCode")}>
        <option value="all">All Codes</option>
        <option value="Code A">Code A</option>
        <option value="Code B">Code B</option>
        <option value="Code C">Code C</option>
      </select>

      <select onChange={handleFilterChange("statusPercentage")}>
        <option value="all">All Percentages</option>
        <option value="75%">75%</option>
        <option value="50%">50%</option>
        <option value="90%">90%</option>
      </select>

      <select onChange={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
