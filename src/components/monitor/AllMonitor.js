import React, { useEffect, useState } from "react";
import "./AllMonitors.css";
import CheckBoxFilter from "./filter carts/CheckBoxFilter";
import MonitorCart from "./MonitorCart";
import Slider from "./Slider";

const AllMonitor = () => {
  // const monitors = useLoaderData();
  const [monitors, setMonitors] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // these state for checkbox showing dynamically
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [resolutions, setResolutions] = useState([]);
  const [responseTimes, setResponseTimes] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [refreshRate, setRefreshRate] = useState([]);

  // below use state is for selected state value.these will store multiple selected value
  const [selectedPrice, setSelectedPrice] = useState(100000);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedResolution, setSelectedResolution] = useState([]);
  const [selectedResponseTime, setSelectedResponseTime] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);
  const [selectedRefreshRate, setSelectedRefreshRate] = useState([]);
  const [selectSort, setSelectSort] = useState("default");
  const [productPerPage, setproductPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);

  const [filteredMonitors, setFilteredMonitors] = useState([]);

  // load filter options from database for checkbox dynamically
  useEffect(() => {
    fetch("https://star-tech-server.vercel.app/monitor")
      .then((res) => res.json())
      .then((data) => {
        setBrands([...new Set(data.map((product) => product.brand))]);
        setSizes([...new Set(data.map((product) => product.size))]);
        setResolutions([...new Set(data.map((product) => product.resolution))]);
        setResponseTimes([
          ...new Set(data.map((product) => product.responseTime)),
        ]);
        setStocks([...new Set(data.map((product) => product.availability))]);
        setRefreshRate([
          ...new Set(data.map((product) => product.refreshRate)),
        ]);
        setMonitors(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  // fetch data based on query
  useEffect(() => {
    const query = new URLSearchParams({
      brand: selectedBrand,
      resolution: selectedResolution,
      responseTime: selectedResponseTime,
      refreshRate: selectedRefreshRate,
      price: selectedPrice,
      availability: selectedStock,
      size: selectedSize,
      sortStatus: selectSort,
      pageLimit: productPerPage,
      currentPage: currentPage,
    });

    // fetch data for multi feltering
    fetch(`https://star-tech-server.vercel.app/products?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredMonitors(data.filteredProducts);
        setFilterData(data.filterData);
      })
      .catch((error) => console.error(error.message));
  }, [
    selectedBrand,
    selectedResolution,
    selectedResponseTime,
    selectedRefreshRate,
    selectedPrice,
    selectedStock,
    selectedSize,
    selectSort,
    productPerPage,
    currentPage,
  ]);

  useEffect(() => {
    fetch("https://star-tech-server.vercel.app/")
      .then((res) => res.json())
      .then((data) => console.log("fetching data is: ", data));
  }, []);
  // here we handle the slider and slider state
  // here get the monitors lowest and highest price and pass to the min and max of the range slider
  const maxPrice = Math.max(...monitors.map((monitor) => monitor.price));
  const handleSliderChange = (event) => {
    setSelectedPrice(event.target.value);
  };
  // this is for pagination
  const totalProduct = filterData.length;
  const totalPages = Math.ceil(totalProduct / productPerPage);
  const pageNumber = [...Array(totalPages).keys()];

  // return the main page
  return (
    <div className="monitor-container">
      <div className="monitor-page">
        {/* left side multi filter  */}
        <div className="left-side-space">
          {/* here is the price slider or range  */}
          <div>
            <Slider
              min={0}
              max={maxPrice}
              value={selectedPrice}
              onChange={handleSliderChange}
            />
          </div>

          {/* here is the other checkbox filtering  */}
          <CheckBoxFilter
            checkboxValue={stocks}
            title={"Availability"}
            stockCheck={true}
            selectedItem={selectedStock}
            setSelectedItem={setSelectedStock}
          ></CheckBoxFilter>
          <CheckBoxFilter
            checkboxValue={brands}
            title={"Brand"}
            setSelectedItem={setSelectedBrand}
            selectedItem={selectedBrand}
          ></CheckBoxFilter>
          <CheckBoxFilter
            size={true}
            checkboxValue={sizes}
            title={"Size"}
            selectedItem={selectedSize}
            setSelectedItem={setSelectedSize}
          ></CheckBoxFilter>
          <CheckBoxFilter
            checkboxValue={resolutions}
            title={"Resolution"}
            selectedItem={selectedResolution}
            setSelectedItem={setSelectedResolution}
          ></CheckBoxFilter>
          <CheckBoxFilter
            checkboxValue={responseTimes}
            title={"Response Time"}
            selectedItem={selectedResponseTime}
            setSelectedItem={setSelectedResponseTime}
          ></CheckBoxFilter>
          <CheckBoxFilter
            checkboxValue={refreshRate}
            title={"Refresh Rate"}
            selectedItem={selectedRefreshRate}
            setSelectedItem={setSelectedRefreshRate}
          ></CheckBoxFilter>
        </div>
        {/* right side monitors products container */}
        <div className="right-side-space">
          {/* monitor sort container  */}
          <div className="monitor-sort-container">
            <h5 className="me-2">Monitor</h5>
            <div className="sort-option d-flex align-items-center">
              <div className="me-2">
                <h6 className="d-inline text-secondary">Show Per Page: </h6>
                <select
                  onChange={(event) => {
                    setproductPerPage(event.target.value);
                    setCurrentPage(0);
                  }}
                  name=""
                  value={productPerPage}
                  id=""
                  className="option-select"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={50}>50</option>
                  <option value={80}>80</option>
                </select>
              </div>
              <div>
                {" "}
                <h6 className="d-inline me-2 text-secondary">Sort By:</h6>
                <select
                  onChange={(event) => setSelectSort(event.target.value)}
                  className="option-select"
                  value={selectSort}
                >
                  <option value={"default"} name="" id="">
                    Default
                  </option>
                  <option value={"ascending"} name="" id="">
                    Price(Low{`<`}High)
                  </option>
                  <option value={"descending"} name="" id="">
                    Price(High{`>`}Low)
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="monitors-container">
            {filteredMonitors.map((monitor, index) => (
              <MonitorCart key={index} monitor={monitor}></MonitorCart>
            ))}
          </div>
        </div>
      </div>
      {/* pagination part */}
      <div>
        {filterData.length <= productPerPage ? (
          ""
        ) : (
          <>
            <hr />
            <div className="pagination-container">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              {pageNumber.map((number) => (
                <button
                  onClick={() => setCurrentPage(number)}
                  key={number}
                  className={currentPage === number ? "active" : ""}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </div>
            <hr />
          </>
        )}
      </div>
    </div>
  );
};

export default AllMonitor;
