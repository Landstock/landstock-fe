<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" width="100" textAlign="Right"></e-column>
      <e-column field="CustomerID" width="100"></e-column>
      <e-column field="EmployeeID" width="100" textAlign="Right"></e-column>
      <e-column
        field="Freight"
        width="100"
        format="C2"
        textAlign="Right"
      ></e-column>
      <e-column field="ShipCountry" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import {
  GridComponent as EjsGrid,
  ColumnsDirective as EColumns,
  ColumnDirective as EColumn,
} from "@syncfusion/ej2-vue-grids";
const data = [
  {
    OrderID: 10248,
    CustomerID: "VINET",
    EmployeeID: 5,
    ShipCountry: "France",
    Freight: 32.38,
  },
  {
    OrderID: 10249,
    CustomerID: "TOMSP",
    EmployeeID: 6,
    ShipCountry: "Germany",
    Freight: 11.61,
  },
  {
    OrderID: 10250,
    CustomerID: "HANAR",
    EmployeeID: 4,
    ShipCountry: "Brazil",
    Freight: 65.83,
  },
];
</script>

<style>
@import "@syncfusion/ej2-base/styles/material.css";
@import "@syncfusion/ej2-buttons/styles/material.css";
@import "@syncfusion/ej2-calendars/styles/material.css";
@import "@syncfusion/ej2-dropdowns/styles/material.css";
@import "@syncfusion/ej2-inputs/styles/material.css";
@import "@syncfusion/ej2-navigations/styles/material.css";
@import "@syncfusion/ej2-popups/styles/material.css";
@import "@syncfusion/ej2-splitbuttons/styles/material.css";
@import "@syncfusion/ej2-vue-grids/styles/material.css";
</style>
