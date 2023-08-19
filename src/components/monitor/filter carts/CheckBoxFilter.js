import React from "react";
import { Card } from "react-bootstrap";

const CheckBoxFilter = ({
  checkboxValue,
  title,
  stockCheck,
  size,
  setSelectedItem,
  selectedItem,
}) => {
  checkboxValue = checkboxValue.sort();

  // for size, i have created array of array for range
  const subArrSize = 3;
  const subArray = [];
  if (size) {
    const numbers = checkboxValue.map((s) => parseFloat(s));
    for (let i = 0; i < numbers.length; i += subArrSize) {
      const tempArr = numbers.slice(i, i + subArrSize);
      subArray.push(tempArr);
    }
  }

  // hanlder to get the selected value of checkbox and then load this data
  const handleCheckboxValue = (event) => {
    if (event.target.checked) {
      setSelectedItem([...selectedItem, event.target.value]);
    } else {
      setSelectedItem(
        selectedItem.filter((item) => item !== event.target.value)
      );
    }
  };

  return (
    <Card className="mt-3">
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body>
        {stockCheck ? (
          // here print the stock condition
          <>
            {checkboxValue.map((option, index) => (
              <>
                <label key={index}>
                  <input
                    onChange={handleCheckboxValue}
                    key={index}
                    type="checkbox"
                    value={option}
                  />{" "}
                  {`${option ? "In Stock" : "Out of Stock"}`}
                </label>
                <br />
              </>
            ))}
          </>
        ) : size ? (
          // here print the size range
          <>
            {subArray.map((arr, index) => (
              <>
                <label key={index}>
                  <input
                    onChange={handleCheckboxValue}
                    key={index}
                    type="checkbox"
                    value={arr}
                  />
                  {index === subArray.length - 1 ? (
                    <> {Math.min(...arr)} and Above</>
                  ) : (
                    <>
                      {" "}
                      {Math.min(...arr)}-{Math.max(...arr)} inch
                    </>
                  )}
                </label>
                <br />
              </>
            ))}
          </>
        ) : (
          // here print the other checkbox
          <>
            {checkboxValue.map((option, index) => (
              <>
                <label key={index}>
                  <input
                    key={index}
                    onChange={handleCheckboxValue}
                    type="checkbox"
                    value={option}
                  />{" "}
                  {option}
                </label>
                <br />
              </>
            ))}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CheckBoxFilter;
