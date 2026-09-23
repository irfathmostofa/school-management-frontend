import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { StudentShell } from "@/components/layout/StudentShell";
import { ParentShell } from "@/components/layout/ParentShell";
import { GuestOnly, RequireAuth } from "@/pages/RequireAuth";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ClassesPage } from "@/pages/academic/ClassesPage";
import { SectionsPage } from "@/pages/academic/SectionsPage";
import { SubjectsPage } from "@/pages/academic/SubjectsPage";
import { SessionsPage } from "@/pages/academic/SessionsPage";
import { RoutinesPage } from "@/pages/academic/RoutinesPage";
import { HomeworkPage } from "@/pages/academic/HomeworkPage";
import { ExamsPage } from "@/pages/academic/ExamsPage";
import { AttendancePage } from "@/pages/academic/AttendancePage";
import { StudentsPage } from "@/pages/stad/StudentsPage";
import { AdmissionPage } from "@/pages/stad/AdmissionPage";
import { ApplicantsPage } from "@/pages/stad/ApplicantsPage";
import { HifzPage } from "@/pages/stad/HifzPage";
import { TcPage } from "@/pages/stad/TcPage";
import { EmployeesPage } from "@/pages/hris/EmployeesPage";
import { DepartmentsPage } from "@/pages/hris/DepartmentsPage";
import { DesignationsPage } from "@/pages/hris/DesignationsPage";
import { LeavePage } from "@/pages/hr/LeavePage";
import { RecruitmentPage } from "@/pages/hr/RecruitmentPage";
import { ResignationPage } from "@/pages/hr/ResignationPage";
import { FeeCollectionPage } from "@/pages/fees/FeeCollectionPage";
import { FeeTypesPage } from "@/pages/fees/FeeTypesPage";
import { PaymentsPage } from "@/pages/account/PaymentsPage";
import { IncomePage } from "@/pages/account/IncomePage";
import { HeadsPage } from "@/pages/account/HeadsPage";
import { RequisitionsPage } from "@/pages/procurement/RequisitionsPage";
import { ProductsPage } from "@/pages/store/ProductsPage";
import { VisitorsPage } from "@/pages/front-office/VisitorsPage";
import { PostalPage } from "@/pages/front-office/PostalPage";
import { EventsPage } from "@/pages/admin/EventsPage";
import { CampusPage } from "@/pages/settings/CampusPage";
import { UsersPage } from "@/pages/settings/UsersPage";
import { RolesPage } from "@/pages/settings/RolesPage";
import { StudentDashboardPage } from "@/pages/portals/StudentDashboardPage";
import { StudentHomeworkPage } from "@/pages/portals/student/StudentHomeworkPage";
import { StudentClassworkPage } from "@/pages/portals/student/StudentClassworkPage";
import { StudentTestsPage } from "@/pages/portals/student/StudentTestsPage";
import { StudentAttendancePage } from "@/pages/portals/student/StudentAttendancePage";
import { StudentRoutinePage } from "@/pages/portals/student/StudentRoutinePage";
import { StudentDiaryPage } from "@/pages/portals/student/StudentDiaryPage";
import { StudentLibraryPage } from "@/pages/portals/student/StudentLibraryPage";
import { StudentNewsPage } from "@/pages/portals/student/StudentNewsPage";
import { ParentDashboardPage } from "@/pages/portals/ParentDashboardPage";
import { ParentAttendancePage } from "@/pages/portals/parent/ParentAttendancePage";
import { ParentHomeworkPage } from "@/pages/portals/parent/ParentHomeworkPage";
import { ParentDiaryPage } from "@/pages/portals/parent/ParentDiaryPage";
import { ParentFeesPage } from "@/pages/portals/parent/ParentFeesPage";
import { ParentNewsPage } from "@/pages/portals/parent/ParentNewsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login?portal=admin" replace />} />
      <Route
        path="/login"
        element={
          <GuestOnly>
            <LoginPage />
          </GuestOnly>
        }
      />
      <Route path="/student/login" element={<Navigate to="/login?portal=student" replace />} />
      <Route path="/parent/login" element={<Navigate to="/login?portal=parent" replace />} />

      <Route
        element={
          <RequireAuth portal="admin">
            <AppShell />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/academic/classes" element={<ClassesPage />} />
        <Route path="/academic/sections" element={<SectionsPage />} />
        <Route path="/academic/subjects" element={<SubjectsPage />} />
        <Route path="/academic/sessions" element={<SessionsPage />} />
        <Route path="/academic/routines" element={<RoutinesPage />} />
        <Route path="/academic/homework" element={<HomeworkPage />} />
        <Route path="/academic/exams" element={<ExamsPage />} />
        <Route path="/academic/attendance" element={<AttendancePage />} />
        <Route path="/stad/students" element={<StudentsPage />} />
        <Route path="/stad/admission" element={<AdmissionPage />} />
        <Route path="/stad/applicants" element={<ApplicantsPage />} />
        <Route path="/stad/hifz" element={<HifzPage />} />
        <Route path="/stad/tc" element={<TcPage />} />
        <Route path="/hris/employees" element={<EmployeesPage />} />
        <Route path="/hris/departments" element={<DepartmentsPage />} />
        <Route path="/hris/designations" element={<DesignationsPage />} />
        <Route path="/hr/leave" element={<LeavePage />} />
        <Route path="/hr/recruitment" element={<RecruitmentPage />} />
        <Route path="/hr/resignation" element={<ResignationPage />} />
        <Route path="/fees/collection" element={<FeeCollectionPage />} />
        <Route path="/fees/types" element={<FeeTypesPage />} />
        <Route path="/account/payments" element={<PaymentsPage />} />
        <Route path="/account/income" element={<IncomePage />} />
        <Route path="/account/heads" element={<HeadsPage />} />
        <Route path="/procurement/requisitions" element={<RequisitionsPage />} />
        <Route path="/store/products" element={<ProductsPage />} />
        <Route path="/front-office/visitors" element={<VisitorsPage />} />
        <Route path="/front-office/postal" element={<PostalPage />} />
        <Route path="/admin/events" element={<EventsPage />} />
        <Route path="/settings/campus" element={<CampusPage />} />
        <Route path="/settings/users" element={<UsersPage />} />
        <Route path="/settings/roles" element={<RolesPage />} />
      </Route>

      <Route
        element={
          <RequireAuth portal="student">
            <StudentShell />
          </RequireAuth>
        }
      >
        <Route path="/student" element={<StudentDashboardPage />} />
        <Route path="/student/homework" element={<StudentHomeworkPage />} />
        <Route path="/student/classwork" element={<StudentClassworkPage />} />
        <Route path="/student/tests" element={<StudentTestsPage />} />
        <Route path="/student/attendance" element={<StudentAttendancePage />} />
        <Route path="/student/routine" element={<StudentRoutinePage />} />
        <Route path="/student/diary" element={<StudentDiaryPage />} />
        <Route path="/student/library" element={<StudentLibraryPage />} />
        <Route path="/student/news" element={<StudentNewsPage />} />
      </Route>

      <Route
        element={
          <RequireAuth portal="parent">
            <ParentShell />
          </RequireAuth>
        }
      >
        <Route path="/parent" element={<ParentDashboardPage />} />
        <Route path="/parent/attendance" element={<ParentAttendancePage />} />
        <Route path="/parent/homework" element={<ParentHomeworkPage />} />
        <Route path="/parent/diary" element={<ParentDiaryPage />} />
        <Route path="/parent/fees" element={<ParentFeesPage />} />
        <Route path="/parent/news" element={<ParentNewsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
