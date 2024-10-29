import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "../app/component/Header/Header";
import DashboardPage from "../app/component/pages/Dashboard-Page/DashboardPage";
import ReportsPage from "../app/component/pages/Reports-page/ReportsPage";
import Login from "../app/component/pages/Login/Login";
import CreateAccount from "../app/component/pages/Create-Account/CreateAccount";
import ForgotPassword from "../app/component/pages/Password/ForgotPassword";
import CandidateTableList from "../app/component/pages/Candidate-Page/CandidateTableList";
import "../app/common/common.css";
import JobsTableList from "../app/component/pages/Jobs-Page/JobsTableList";
import ClientTableList from "../app/component/pages/Client-page/ClientTableList";
import ManageAccount from "../app/component/pages/ManageAccount/ManageAccount";
import CandidatePage from "../app/component/pages/Candidate-Page/CandidatePage";
import ImportCandidate from "../app/component/pages/Candidate-Page/ImportCandidate/ImportCandidate";
import ResumeUpload from "../app/component/pages/Candidate-Page/ResumeUpload/ResumeUpload";
import EmployeeInfo from "../app/component/pages/EmployeeInfo/EmployeeInfo";
import CreateJob from "../app/component/pages/Jobs-Page/Createjob";
import CreateClient from "../app/component/pages/Client-page/CreateClient";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "../app/component/pages/ErrorBoundary";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import { Navigate } from "react-router-dom";
import { ScrollToTop } from "../app/common/CommonFunctions/CommonFunctions";
import PasswordCode from "../app/component/pages/Password/PasswordCode";
import ResetPassword from "../app/component/pages/Password/ResetPassword";
import VerifyEmail from "../app/component/pages/Create-Account/VerifyEmail";
import CandidateFieldMapping from "../app/component/pages/Candidate-Page/ImportCandidate/CandidateFieldMapping";
import ImportClient from "../app/component/pages/Client-page/Import-Client/ImportClient";
import ClientFieldMapping from "../app/component/pages/Client-page/Import-Client/ClientFieldMapping";
import EmployeeList from "../app/component/pages/Employee-Reports/EmployeeList";
import EmployeeDetails from "../app/component/pages/Employee-Reports/EmployeeDetails";
import AddEmployeeDesignation from "../app/component/pages/Employee-Reports/AddEmployeeDesignation";
import EmpMonthWiseLeaveHistory from "../app/component/pages/Employee-Reports/Employee-Leave-Details/EmpMonthWiseLeaveHistory";
import EMPYearWiseLeaveHistory from "../app/component/pages/Employee-Reports/Employee-Leave-Details/EmpYearWiseLeaveHistory";
import TeamsReport from "../app/component/pages/Reports-page/TeamsReport";
import ReportDetails from "../app/component/pages/Reports-page/ReportDetails";
import MenuList from "../app/component/pages/Admin/Menus/MenuList";
import MenuMapping from "../app/component/pages/Admin/Menus/MenuMapping";
import UserActions from "../app/component/pages/Admin/Menus/UserActions";
import CallStages from "../app/component/pages/Admin/Call-Stages/CallStages";
import StageAccessControl from "../app/component/pages/Admin/Call-Stages/StageAccessControl";
import DailyReportAccess from "../app/component/pages/Admin/Daily-Report-Access/DailyReportAccess";
import AddNewSkills from "../app/component/pages/Admin/Masters/AddNewSkills";
import AddNewRole from "../app/component/pages/Admin/Masters/AddNewRole";
import CountryList from "../app/component/pages/Admin/Country/CountryList";
import StateList from "../app/component/pages/Admin/Country/StateList";
import CityList from "../app/component/pages/Admin/Country/CityList";
import LocalityList from "../app/component/pages/Admin/Country/LocalityList";
import ExternalLoginTrack from "../app/component/pages/Admin/Login-Track/ExternalLoginTrack";
import CustomerPriorityAccess from "../app/component/pages/Admin/Customer-Priority-Access/CustomerPriorityAccess";
import ConnectionList from "../app/component/pages/Admin/Connections/ConnectionList";
import AddConnection from "../app/component/pages/Admin/Connections/AddConnection";
import IpAddressConfigure from "../app/component/pages/Admin/IP-Configure/IpAddressConfigure";
import EmailTemplateList from "../app/component/pages/Admin/Email-Templates/EmailTemplateList";
import EditEmailTemplates from "../app/component/pages/Admin/Email-Templates/EditEmailTemplates";
import ComposeMail from "../app/component/pages/Email-Pro/ComposeMail";
import Scheduler from "../app/component/pages/Planner/Scheduler";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthRoute />,
    errorElement: <Login />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: (
          <>
            <ScrollToTop />
            <Login />
          </>
        ),
      },
      {
        path: "register",
        element: (
          <>
            <ScrollToTop />
            <CreateAccount />
          </>
        ),
      },
      {
        path: "register-code",
        element: (
          <>
            <ScrollToTop />
            <VerifyEmail />
          </>
        ),
      },
      {
        path: "forgot",
        element: (
          <>
            <ScrollToTop />
            <ForgotPassword />
          </>
        ),
      },

      {
        path: "code",
        element: (
          <>
            <ScrollToTop />
            <PasswordCode />
          </>
        ),
      },
      {
        path: "reset",
        element: (
          <>
            <ScrollToTop />
            <ResetPassword />
          </>
        ),
      },
    ],
  },
  {
    path: "/",

    element: <PrivateRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Header />,
        children: [
          {
            path: "dashboard",
            caseSensitive: true,
            element: <DashboardPage />,
          },
          {
            path: "manage-account",
            element: <ManageAccount />,
            caseSensitive: true,
          },
          {
            path: "candidates",
            caseSensitive: true,
            element: <CandidateTableList />,
          },
          {
            path: "jobs",
            caseSensitive: true,
            element: <JobsTableList />,
          },
          {
            path: "clients",
            caseSensitive: true,
            element: <ClientTableList />,
          },
          {
            path: "import-client",
            caseSensitive: true,
            element: <ImportClient />,
          },
          {
            path: "client-field-mapping",
            caseSensitive: true,
            element: <ClientFieldMapping />,
          },
          {
            path: "reports",
            caseSensitive: true,
            element: <ReportsPage />,
          },
          {
            path: "team-reports",
            caseSensitive: true,
            element: <TeamsReport />,
          },
          {
            path: "report-details",
            caseSensitive: true,
            element: <ReportDetails />,
          },
          {
            path: "employee-list",
            caseSensitive: true,
            element: <EmployeeList />,
          },
          {
            path: "add-employee-details",

            caseSensitive: true,
            element: <EmployeeDetails />,
          },
          {
            path: "add-employee-designation",
            caseSensitive: true,
            element: <AddEmployeeDesignation />,
          },
          {
            path: "leave-history-monthly",
            caseSensitive: true,
            element: <EmpMonthWiseLeaveHistory />,
          },
          {
            path: "leave-history-yearly",
            caseSensitive: true,
            element: <EMPYearWiseLeaveHistory />,
          },
          {
            path: "create-candidate",
            caseSensitive: true,
            element: <CandidatePage />,
          },
          {
            path: "import-candidate",
            caseSensitive: true,
            element: <ImportCandidate />,
          },
          {
            path: "candidate-field-mapping",
            caseSensitive: true,
            element: <CandidateFieldMapping />,
          },
          {
            path: "resume-upload",
            caseSensitive: true,
            element: <ResumeUpload />,
          },
          {
            path: "candidate-info",
            caseSensitive: true,
            element: <EmployeeInfo />,
          },
          {
            path: "create-job",
            element: <CreateJob />,
          },
          {
            path: "create-client",
            caseSensitive: true,
            element: <CreateClient />,
          },
          {
            path: "menu",
            caseSensitive: true,
            element: <MenuList />,
          },
          {
            path: "menu-mapping",
            caseSensitive: true,
            element: <MenuMapping />,
          },
          {
            path: "user-actions",
            caseSensitive: true,
            element: <UserActions />,
          },
          {
            path: "call-stages",
            caseSensitive: true,
            element: <CallStages />,
          },
          {
            path: "stage-access-control",
            caseSensitive: true,
            element: <StageAccessControl />,
          },
          {
            path: "daily-report-access",
            caseSensitive: true,
            element: <DailyReportAccess />,
          },
          {
            path: "skills-list",

            caseSensitive: true,
            element: <AddNewSkills />,
          },
          {
            path: "roles-list",
            caseSensitive: true,
            element: <AddNewRole />,
          },
          {
            path: "country-list",
            caseSensitive: true,
            element: <CountryList />,
          },
          {
            path: "state-list",
            caseSensitive: true,
            element: <StateList />,
          },
          {
            path: "city-list",
            caseSensitive: true,
            element: <CityList />,
          },
          {
            path: "locality-list",
            caseSensitive: true,
            element: <LocalityList />,
          },
          {
            path: "external-login-track",
            caseSensitive: true,
            element: <ExternalLoginTrack />,
          },
          {
            path: "customer-priority-access",
            caseSensitive: true,
            element: <CustomerPriorityAccess />,
          },
          {
            path: "connection-list",
            caseSensitive: true,
            element: <ConnectionList />,
          },
          {
            path: "add-connection",
            caseSensitive: true,
            element: <AddConnection />,
          },
          {
            path: "add-ip-address",
            caseSensitive: true,
            element: <IpAddressConfigure />,
          },
          {
            path: "email-template-list",
            caseSensitive: true,
            element: <EmailTemplateList />,
          },
          {
            path: "edit-email-template",
            caseSensitive: true,
            element: <EditEmailTemplates />,
          },
          {
            path: "scheduler",
            caseSensitive: true,
            element: <Scheduler />,
          },
          {
            path: "compose-mail",
            caseSensitive: true,
            element: <ComposeMail />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default AppRouter;
