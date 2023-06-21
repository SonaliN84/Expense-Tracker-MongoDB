import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Users from "./pages/Users";
import ProfileUpdate from "./pages/ProfileUpdate";
import RootLayout from "./pages/RootLayout";
import { useEffect, useContext } from "react";

import { expenseActions } from "./Store/expense-slice";

import Forgot_Password from "./pages/Forgot_Password";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./Store/auth-slice";
import Leaderboard from "./pages/Leaderboard";
import DownloadHistory from "./pages/DownloadHistory";
import ExpenseAnalysisPremium from "./pages/ExpenseAnalysisPremium";

function App() {
  const theme = useSelector((state) => state.theme.theme);
  // console.log(theme)
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const authIsLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authIsPremium = useSelector((state) => state.auth.isPremium);
  const activePage = useSelector((state) => state.auth.activePage);

  const LIMIT = useSelector((state) => state.auth.limit);
  console.log("activrepage", activePage);

  useEffect(() => {
    if (authIsLoggedIn) {
      const enteredMonth = localStorage.getItem("month");
      const enteredYear = localStorage.getItem("year");
      axios
        .get("http://localhost:3000/premium/expense-analysis", {
          headers: { Authorization: authToken },
          params: { year: enteredYear, month: enteredMonth },
        })
        .then((response) => {
          console.log(response);
          dispatch(expenseActions.setExpenseAnalysisData(response.data));
        });
      if (authIsPremium) {
        axios
          .get("http://localhost:3000/premium/showleaderboard", {
            headers: { Authorization: authToken },
          })
          .then((response) => {
            console.log(response.data);

            dispatch(expenseActions.setLeaderBoardData(response.data));
          });
      }
      axios
        .get("http://localhost:3000/expense/downloadHistory", {
          headers: { Authorization: authToken },
        })
        .then((response) => {
          const array = [];
          for (let i = response.data.length - 1; i >= 0; i--) {
            array.push(response.data[i]);
          }
          dispatch(expenseActions.setDownloadHistory(array));
          console.log(array);
        });
    }
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <RootLayout>
        <Switch>
          {authIsLoggedIn && (
            <Route path="/" exact>
              <Redirect to="/Users" />
            </Route>
          )}
          {!authIsLoggedIn && (
            <Route path="/" exact>
              <Redirect to="/Login" />
            </Route>
          )}
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          {authIsLoggedIn && (
            <Route path="/Users" exact>
              <Users />
            </Route>
          )}
          {!authIsLoggedIn && (
            <Route path="/Users" exact>
              <Redirect to="/Login" />
            </Route>
          )}

          <Route path="/ProfileUpdate">
            <ProfileUpdate />
          </Route>
          <Route path="/Forgot_Password">
            <Forgot_Password />
          </Route>
          {authIsLoggedIn && authIsPremium && (
            <Route path="/Leaderboard">
              <Leaderboard />
            </Route>
          )}
          {!authIsLoggedIn && (
            <Route path="/Leaderboard">
              <Redirect to="/Login" />
            </Route>
          )}
          {authIsLoggedIn && !authIsPremium && (
            <Route path="/Leaderboard">
              <Redirect to="/Users" />
            </Route>
          )}
          <Route path="/DownloadHistory">
            <DownloadHistory />
          </Route>
          <Route path="/ExpenseAnalysis">
            <ExpenseAnalysisPremium />
          </Route>
        </Switch>
      </RootLayout>
    </div>
  );
}

export default App;
