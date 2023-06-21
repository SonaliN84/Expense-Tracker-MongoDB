import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth-slice";
import { themeActions } from "../../Store/theme-slice";
import { expenseActions } from "../../Store/expense-slice";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Store/index";

const Header = () => {
  const history = useHistory();
  const Razorpay = useRazorpay();
  const dispatch = useDispatch();
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authToken = useSelector((state) => state.auth.token);
  const expData = useSelector((state) => state.expense.expenses);
  const authIsPremium = useSelector((state) => state.auth.isPremium);

  const logoutHandler = () => {
    dispatch(expenseActions.setExpenseAnalysisData([]));
    dispatch(authActions.logout());
    dispatch(expenseActions.setExpenses([]));
    localStorage.removeItem("year");
    localStorage.removeItem("month");
    dispatch(expenseActions.setIsForm(false));
    dispatch(expenseActions.setIsEdit(false));
    dispatch(expenseActions.setEditExpense({}));
  };

  const changeThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const totalExpenseAmount = expData.reduce((curNumber, item) => {
    return curNumber + Number.parseInt(item.amount);
  }, 0);

  const activatePremiumHandler = () => {
    axios
      .get("http://localhost:3000/purchase/premiummembership", {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        const options = {
          key: response.data.key_id,
          order_id: response.data.order.id,
          handler: async function (response) {
            await axios.post(
              "http://localhost:3000/purchase/updatetransactionstatus",
              {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
              },
              { headers: { Authorization: authToken } }
            );
            alert("You are a Premium User now");
            dispatch(authActions.setIsPremium());
          },
        };
        const rzpl = new Razorpay(options);
        rzpl.open();

        rzpl.on("payment.failed", async function (response) {
          await axios.post(
            "http://localhost:3000/purchase/failedtransaction",
            {
              order_id: options.order_id,
            },
            { headers: { Authorization: authToken } }
          );
          alert("Something went wrong");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showLeaderboardHandler = () => {
    axios
      .get("http://localhost:3000/premium/showleaderboard", {
        headers: { Authorization: authToken },
      })
      .then((response) => {
        console.log(response.data);

        dispatch(expenseActions.setLeaderBoardData(response.data));
        history.push("/Leaderboard");
      });
  };

  return (
    <Provider store={store}>
      <Navbar bg="primary" expand="lg" variant="dark" collapseOnSelect>
        {authIsLoggedIn && authIsPremium && (
          <img
            src="https://cdn-icons-png.flaticon.com/512/9908/9908162.png"
            style={{ width: "50px", height: "50px" }}
            className="mx-2"
          />
        )}
        <Navbar.Brand href="#home" className="mx-4">
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">About</Nav.Link>
        <Nav.Link href="#pricing">Contact us</Nav.Link> */}
          </Nav>
          {!authIsLoggedIn && (
            <Nav>
              <div className="form-check form-switch my-2">
                <input
                  className="form-check-input bg-secondary"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onClick={changeThemeHandler}
                />
              </div>
              <Nav.Link>
                <NavLink to="/Login" className="loginSignupTitles">
                  Login
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link to="/SignUp" className="me-4 loginSignupTitles">
                  Sign Up
                </Link>
              </Nav.Link>
            </Nav>
          )}
          {authIsLoggedIn && (
            <Nav>
              <div className="form-check form-switch my-2">
                <input
                  className="form-check-input bg-secondary"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onClick={changeThemeHandler}
                />
              </div>
              <Nav.Link>
                <NavLink
                  to="/Login"
                  className="loginSignupTitles me-2"
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink to="/ProfileUpdate" className="loginSignupTitles">
                  Verify Email
                </NavLink>
              </Nav.Link>

              {!authIsPremium && (
                <Button
                  style={{ backgroundColor: "#7C3E66" }}
                  className="mx-2"
                  onClick={activatePremiumHandler}
                >
                  Activate Premium
                </Button>
              )}
              {authIsPremium && (
                <NavLink to="/ExpenseAnalysis">
                  <Button
                    style={{ backgroundColor: "#7C3E66" }}
                    className="mx-2"
                  >
                    Analysis
                  </Button>
                </NavLink>
              )}
              {authIsPremium && (
                <Button
                  style={{ backgroundColor: "#7C3E66" }}
                  className="mx-2"
                  onClick={showLeaderboardHandler}
                >
                  Show Leaderboard
                </Button>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Provider>
  );
};
export default Header;
