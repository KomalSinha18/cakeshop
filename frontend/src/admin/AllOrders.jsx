import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import Moment from "react-moment";

export default function AllOrders() {
  const [allOrderData, setAllOrderData] = useState([]);

  const AdminAllOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/order/all",
        { withCredentials: true }
      );
      setAllOrderData(response.data?.order);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allOrderData);

  useEffect(() => {
    AdminAllOrders();
  }, []);

  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        textAlign: "center",
        mt: 2,
        p: 1,
        color: "#b52364e3",
        fontFamily: "fantasy",
        fontWeight: "light",
      }}
    >
      All orders
      <TableContainer
        component={Paper}
        elevation={4}
        sx={{
          mt: "35px",
          mb: "45px",
          height: "360px",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  p: 2,
                  color: "#b52364e3",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                S.no.
              </TableCell>
              <TableCell
                sx={{
                  p: 2,
                  color: "#b52364e3",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Products
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  p: 2,
                  color: "#b52364e3",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Address
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  p: 2,
                  color: "#b52364e3",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Created By
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  p: 2,
                  color: "#b52364e3",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Created At
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  p: 2,
                  color: "#b52364e3",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Total Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrderData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">
                  {item?.products?.map((product, i) => (
                    <div>
                      {i + 1}. <b>{product?.title}</b> -{" "}
                      <i>{product?.price}.00/-</i>
                    </div>
                  ))}
                </TableCell>
                <TableCell align="right">{item?.address}</TableCell>
                <TableCell align="right"><Moment format="YYYY/MM/DD">{item?.createdAt}</Moment></TableCell>
                <TableCell align="right">{item?.createdBy?.name}</TableCell>
                <TableCell align="right">{item?.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Typography>
  );
}
