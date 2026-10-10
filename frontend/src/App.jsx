import { Routes, Route } from "react-router-dom";
import { useApp } from "./context/AppContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";

import Profile from "./pages/shared/Profile";

import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import ProductListings from "./pages/farmer/ProductListings";
import FarmerInventory from "./pages/farmer/FarmerInventory";
import FarmerOrders from "./pages/farmer/FarmerOrders";
import SalesSummary from "./pages/farmer/SalesSummary";
import FarmerReviews from "./pages/farmer/FarmerReviews";
import Notifications from "./pages/farmer/Notifications";

import DealerDashboard from "./pages/dealer/DealerDashboard";
import BrowseProduce from "./pages/dealer/BrowseProduce";
import MyProducts from "./pages/dealer/MyProducts";
import Inventory from "./pages/dealer/Inventory";
import PurchaseHistory from "./pages/dealer/PurchaseHistory";
import Sales from "./pages/dealer/Sales";
import Transactions from "./pages/dealer/Transactions";

import BrowseProducts from "./pages/customer/BrowseProducts";
import Cart from "./pages/customer/Cart";
import MyOrders from "./pages/customer/MyOrders";
import TrackDelivery from "./pages/customer/TrackDelivery";

import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
import AssignedDeliveries from "./pages/delivery/AssignedDeliveries";
import DeliveryHistory from "./pages/delivery/DeliveryHistory";
import Earnings from "./pages/delivery/Earnings";

import SupportDashboard from "./pages/support/SupportDashboard";
import ManageQueries from "./pages/support/ManageQueries";
import TicketRecords from "./pages/support/TicketRecords";
import Feedback from "./pages/support/Feedback";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import FarmerManagement from "./pages/admin/FarmerManagement";
import DealerManagement from "./pages/admin/DealerManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import PaymentsRevenue from "./pages/admin/PaymentsRevenue";
import Reports from "./pages/admin/Reports";
import SupportManagement from "./pages/admin/SupportManagement";
import Settings from "./pages/admin/Settings";

function App() {
  useApp(); // ensures context is mounted before routes render
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/farmer"
        element={<ProtectedRoute role="farmer"><DashboardLayout role="farmer" /></ProtectedRoute>}
      >
        <Route index element={<FarmerDashboard />} />
        <Route path="listings" element={<ProductListings />} />
        <Route path="inventory" element={<FarmerInventory />} />
        <Route path="orders" element={<FarmerOrders />} />
        <Route path="sales" element={<SalesSummary />} />
        <Route path="reviews" element={<FarmerReviews />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/dealer"
        element={<ProtectedRoute role="dealer"><DashboardLayout role="dealer" /></ProtectedRoute>}
      >
        <Route index element={<DealerDashboard />} />
        <Route path="browse" element={<BrowseProduce />} />
        <Route path="products" element={<MyProducts />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="purchases" element={<PurchaseHistory />} />
        <Route path="sales" element={<Sales />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/customer"
        element={<ProtectedRoute role="customer"><DashboardLayout role="customer" /></ProtectedRoute>}
      >
        <Route index element={<BrowseProducts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="track" element={<TrackDelivery />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/delivery"
        element={<ProtectedRoute role="delivery"><DashboardLayout role="delivery" /></ProtectedRoute>}
      >
        <Route index element={<DeliveryDashboard />} />
        <Route path="assigned" element={<AssignedDeliveries />} />
        <Route path="history" element={<DeliveryHistory />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/support"
        element={<ProtectedRoute role="support"><DashboardLayout role="support" /></ProtectedRoute>}
      >
        <Route index element={<SupportDashboard />} />
        <Route path="queries" element={<ManageQueries />} />
        <Route path="records" element={<TicketRecords />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>

      <Route
        path="/admin"
        element={<ProtectedRoute role="admin"><DashboardLayout role="admin" /></ProtectedRoute>}
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="farmers" element={<FarmerManagement />} />
        <Route path="dealers" element={<DealerManagement />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="payments" element={<PaymentsRevenue />} />
        <Route path="reports" element={<Reports />} />
        <Route path="support" element={<SupportManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
