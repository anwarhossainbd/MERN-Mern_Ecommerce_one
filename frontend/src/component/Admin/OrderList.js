import React ,{ Fragment, useEffect } from 'react'
import SideBar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from '../../actions/orderAction';



const OrderList = () => {


  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);


  useEffect(() => {


    dispatch(getAllOrders())
  },[dispatch]);

const columns = [

    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

];
const rows = [];

orders && orders.forEach((item)=>{
  rows.push({
    id:item._id,
     itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
  })
})

  return (
     <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
          <SideBar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
          />
       

        </div>

      </div>

     </Fragment>
  )
}

export default OrderList