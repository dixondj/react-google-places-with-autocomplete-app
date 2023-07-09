const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: "white",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  container: {
    position: "absolute",
    right: "135%",
    "box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
    "-webkit-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
    "-moz-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },
  types: {
    margin: "20px 0 10px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "14px",
    textAlign: "center",
  },
  previousSearchContainer: {
    maxHeight: "300px",
    maxWidth: "500px",
    width: "300px",
    overflowX: "scroll",
    marginTop: "5px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "white",
    "box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
    "-webkit-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
    "-moz-box-shadow": "0px 0px 5px -1px rgba(0,0,0,0.2)",
  },
  previousSearchWrapper: {
    flexDirection: "row",
    display: "flex",
  },
  closeiconWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: "10px",
  },
  previousSearchCard: {
    backgroundColor: "white",
    cursor: "pointer",
    padding: "5px",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

export default styles;
