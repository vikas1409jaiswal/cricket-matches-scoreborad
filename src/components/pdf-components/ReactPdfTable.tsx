import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

interface TableStyle {
  width: number;
  height?: number;
  backgroundColor: string;
}

interface TableCell {
  text: string;
  style: TableStyle;
}

// Define the props for the ReactPdfTable component
interface ReactPdfTableProps {
  tableTitle: React.ReactNode;
  headers: TableCell[]; // Array of header strings
  data: TableCell[][]; // 2D array for table data
  style?: any; // Optional style prop
}

// Create styles for the table
const styles = StyleSheet.create({
  table: {
    width: "auto",
    margin: "auto",
  },
  tableTitle: {
    backgroundColor: "grey",
    margin: "auto",
    border: "1px solid black",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    border: "1px solid black",
    margin: 2,
    width: "auto",
  },
  tableCell: {
    textAlign: "center",
    borderRadius: 10,
    fontSize: 8,
    fontWeight: "bold",
    padding: 3,
  },
});

// ReactPdfTable Component
const ReactPdfTable: React.FC<ReactPdfTableProps> = ({
  headers,
  data,
  style,
  tableTitle,
}) => {
  return (
    <View style={{ ...styles.table, ...style }}>
      {/* Render Table Title */}
      <View
        style={{
          ...styles.tableTitle,
          width: headers.map((x) => x.style.width).reduce((a, b) => a + b, 16),
        }}
      >
        {tableTitle}
      </View>
      {/* Render Table Header */}
      <View style={styles.tableRow}>
        {headers.map((header, index) => (
          <View key={index} style={{ ...styles.tableCol, ...header.style }}>
            <Text style={styles.tableCell}>{header.text}</Text>
          </View>
        ))}
      </View>
      {/* Render Table Rows */}
      {data.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} style={{ ...styles.tableCol, ...cell.style }}>
              <Text style={styles.tableCell}>{cell.text}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ReactPdfTable;
